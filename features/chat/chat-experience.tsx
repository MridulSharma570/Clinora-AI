"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowUp, Bot, ExternalLink, FileQuestion, LockKeyhole, MessageCircleQuestion, ShieldCheck, Sparkles, User } from "lucide-react";
import { z } from "zod";
import { useApp } from "@/components/layout/app-provider";
import { Button, GlassLink } from "@/components/ui/button";
import { Badge, GlassCard } from "@/components/ui/card";
import { PrivacyReminder } from "@/components/safety/privacy-reminder";
import { ExplainabilityPanel } from "@/components/safety/explainability-panel";
import { AI_UNAVAILABLE_MESSAGE, SAFE_BOUNDARY_MESSAGE } from "@/lib/ai/output-safety";
import { detectPii, piiEditMessage } from "@/lib/privacy/pii";
import { validateKnowledgeResources } from "@/lib/retrieval/knowledge";
import type { KnowledgeResource } from "@/lib/retrieval/knowledge";
import { assessEmergency } from "@/lib/safety/emergency";
import type { EmergencyRuleMatch } from "@/lib/safety/emergency";
import { MAX_CHAT_MESSAGE_LENGTH } from "@/lib/validation/chat";

const resourceSchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  sourceOrganization: z.string(),
  sourceUrl: z.url().startsWith("https://"),
});

const streamEventSchema = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("meta"), resources: z.array(resourceSchema).max(3), openRouterContacted: z.literal(true) }),
  z.strictObject({ type: z.literal("delta"), text: z.string().max(2_000) }),
  z.strictObject({ type: z.literal("done") }),
]);

const apiResponseSchema = z.object({
  kind: z.enum(["invalid", "consent", "emergency", "pii", "unavailable", "blocked"]),
  message: z.string().optional(),
  redirect: z.string().optional(),
  signals: z.array(z.strictObject({ id: z.string(), category: z.enum(["physical", "crisis"]), label: z.string() })).optional(),
});

type Availability = "loading" | "ready" | "unavailable";

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "safety";
  text: string;
  resources?: KnowledgeResource[];
}

const starters = [
  "How can I organize questions for an appointment?",
  "What makes a useful health-concern timeline?",
  "How can I protect my privacy online?",
];

function verifiedResources(input: KnowledgeResource[]): KnowledgeResource[] {
  const local = validateKnowledgeResources(input.map((resource) => resource.id));
  return local.filter((resource) => input.some((candidate) =>
    candidate.id === resource.id &&
    candidate.title === resource.title &&
    candidate.sourceOrganization === resource.sourceOrganization &&
    candidate.sourceUrl === resource.sourceUrl,
  ));
}

function messageId(): string {
  return globalThis.crypto.randomUUID();
}

export function ChatExperience() {
  const { consent, recordSafetyEvent } = useApp();
  const [availability, setAvailability] = useState<Availability>("loading");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [lastResources, setLastResources] = useState<KnowledgeResource[]>([]);
  const [openRouterContacted, setOpenRouterContacted] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/chat/status", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Status unavailable");
        const body: unknown = await response.json();
        const configured = z.strictObject({ configured: z.boolean() }).parse(body).configured;
        setAvailability(configured ? "ready" : "unavailable");
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setAvailability("unavailable");
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const element = transcriptRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, busy]);

  const removeMessage = (id: string) => setMessages((current) => current.filter((message) => message.id !== id));

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const outgoing = input.trim();
    if (!outgoing || busy || availability !== "ready") return;

    setError("");
    setLastResources([]);
    setOpenRouterContacted(false);

    const emergency = assessEmergency(outgoing);
    if (emergency.shouldRoute) {
      recordSafetyEvent({ matches: emergency.matches, source: "chat" });
      router.push("/emergency");
      return;
    }

    const piiMatches = detectPii(outgoing);
    if (piiMatches.length > 0) {
      setError(piiEditMessage(piiMatches));
      return;
    }

    const userMessage: ChatMessage = { id: messageId(), role: "user", text: outgoing };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setBusy(true);
    let pendingAssistantId: string | null = null;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/x-ndjson, application/json" },
        body: JSON.stringify({
          message: outgoing,
          consentConfirmed: consent.accepted,
          adultConfirmed: consent.adult,
        }),
        cache: "no-store",
      });

      const contentType = response.headers.get("content-type") ?? "";
      if (response.ok && contentType.includes("application/x-ndjson") && response.body) {
        const assistantId = messageId();
        pendingAssistantId = assistantId;
        setMessages((current) => [...current, { id: assistantId, role: "assistant", text: "" }]);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let answer = "";
        let completed = false;

        const consume = (line: string) => {
          if (!line.trim()) return;
          const parsed = streamEventSchema.safeParse(JSON.parse(line));
          if (!parsed.success) throw new Error("Invalid validated response stream");
          const eventData = parsed.data;
          if (eventData.type === "meta") {
            const resources = verifiedResources(eventData.resources);
            setLastResources(resources);
            setOpenRouterContacted(true);
            setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, resources } : message));
          } else if (eventData.type === "delta") {
            answer += eventData.text;
            if (answer.length > 16_000) throw new Error("Validated response exceeded display limit");
            setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, text: answer } : message));
          } else {
            completed = true;
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() ?? "";
          lines.forEach(consume);
        }
        buffer += decoder.decode();
        if (buffer.trim()) consume(buffer);
        if (!completed || !answer.trim()) throw new Error("Incomplete validated response");
        pendingAssistantId = null;
      } else {
        const parsed = apiResponseSchema.safeParse(await response.json());
        if (!parsed.success) throw new Error("Unavailable response");

        if (parsed.data.kind === "emergency") {
          const matches: EmergencyRuleMatch[] = parsed.data.signals ?? [];
          recordSafetyEvent({ matches, source: response.status === 422 ? "chat" : "ai-output" });
          router.push(parsed.data.redirect === "/emergency" ? "/emergency" : "/emergency");
          return;
        }

        if (parsed.data.kind === "blocked") {
          setOpenRouterContacted(true);
          setMessages((current) => [...current, { id: messageId(), role: "safety", text: SAFE_BOUNDARY_MESSAGE }]);
        } else {
          removeMessage(userMessage.id);
          setInput(outgoing);
          setError(parsed.data.message ?? AI_UNAVAILABLE_MESSAGE);
          if (parsed.data.kind === "unavailable") setAvailability("unavailable");
        }
      }
    } catch {
      if (pendingAssistantId) removeMessage(pendingAssistantId);
      removeMessage(userMessage.id);
      setInput(outgoing);
      setError(AI_UNAVAILABLE_MESSAGE);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="chat-page">
      <header className="chat-heading">
        <div>
          <Badge tone="violet"><Sparkles size={13} aria-hidden="true" /> Optional educational AI</Badge>
          <h1>Ask Clinora AI</h1>
          <p>General information and appointment preparation, with clear limits.</p>
          <p className="ai-disclaimer"><ShieldCheck size={15} aria-hidden="true" /> AI-generated educational guidance — not medical advice.</p>
        </div>
        <GlassLink href="/check" variant="secondary" className="button-small"><FileQuestion size={16} aria-hidden="true" /> Use Guided Check</GlassLink>
      </header>

      {availability === "unavailable" && (
        <div className="status-banner status-banner-warning" role="status" style={{ marginBottom: 16 }}>
          <AlertCircle size={21} aria-hidden="true" />
          <p><strong>AI chat is currently unavailable.</strong>{AI_UNAVAILABLE_MESSAGE}</p>
        </div>
      )}

      <GlassCard className="chat-shell">
        <div className="chat-status-bar">
          <span className={`chat-status-dot ${availability === "ready" ? "ready" : ""}`}>
            {availability === "loading" ? "Checking configuration" : availability === "ready" ? "Educational chat configured" : "AI unavailable · local tools ready"}
          </span>
          <span>No chat history sent</span>
        </div>

        <div className="chat-transcript" ref={transcriptRef} role="log" aria-label="Educational chat transcript" aria-live="polite" aria-relevant="additions text">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <div className="icon-tile icon-tile-violet"><MessageCircleQuestion size={23} aria-hidden="true" /></div>
              <h2>What would you like to prepare?</h2>
              <p>Ask about appointment preparation, timelines, privacy, or Clinora AI’s scope. Do not ask for diagnosis, treatment, doses, or test interpretation.</p>
              <div className="chat-starters" aria-label="Example prompts">
                {starters.map((starter) => <button type="button" className="chat-starter" key={starter} disabled={availability !== "ready" || busy} onClick={() => setInput(starter)}>{starter}</button>)}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <article className={`message message-${message.role}`} key={message.id}>
                <p className="message-label">
                  {message.role === "user" ? <User size={12} aria-hidden="true" /> : <Bot size={12} aria-hidden="true" />}
                  {message.role === "user" ? "You" : message.role === "safety" ? "Safety boundary · not AI-generated" : "Clinora AI · educational"}
                </p>
                <div className="message-bubble">{message.text || (busy ? "Validated response is streaming…" : "")}</div>
                {message.resources && message.resources.length > 0 && (
                  <div className="message-resources">
                    <h3>Related resources supplied to Clinora AI</h3>
                    <p>External references only. They do not medically validate this AI output; it may still be incomplete or incorrect.</p>
                    {message.resources.map((resource) => (
                      <a className="resource-link" href={resource.sourceUrl} target="_blank" rel="noreferrer" key={resource.id}>
                        <span>{resource.title}<small>{resource.sourceOrganization}</small></span><ExternalLink size={14} aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
          {busy && (
            <div className="loading-dots" aria-label="Waiting for a validated response" role="status"><span /><span /><span /></div>
          )}
        </div>

        <form className="chat-composer" onSubmit={sendMessage}>
          <PrivacyReminder chat />
          <div className="field">
            <label htmlFor="chat-message" className="form-label">Your educational question</label>
            <div className="chat-input-row">
              <textarea
                id="chat-message"
                className="form-textarea"
                value={input}
                maxLength={MAX_CHAT_MESSAGE_LENGTH}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about preparing for a visit…"
                disabled={availability !== "ready" || busy}
                aria-describedby="chat-input-help"
              />
              <Button type="submit" className="chat-send" disabled={!input.trim() || availability !== "ready" || busy} aria-label="Send educational question">
                <ArrowUp size={21} aria-hidden="true" />
              </Button>
            </div>
            <div className="chat-form-meta" id="chat-input-help">
              <span>{busy ? "Validating the complete response before display…" : "Only this message + selected original cards are sent."}</span>
              <span>{input.length}/{MAX_CHAT_MESSAGE_LENGTH}</span>
            </div>
          </div>
          {error && <div className="status-banner status-banner-warning chat-error" role="alert"><AlertCircle size={19} aria-hidden="true" /><p>{error}</p></div>}
        </form>
      </GlassCard>

      <div className="chat-below">
        <ExplainabilityPanel
          safetyRule="Deterministic emergency and high-confidence PII checks run before provider access. Complete AI output is filtered before display. These checks are incomplete and not clinical assessments."
          knowledgeCards={lastResources}
          localData="Unsaved chat turns stay in memory. Guided Check drafts and saved history are not attached. Only the current message and selected original cards leave after Send; prior chat turns are not sent."
          openRouterContacted={openRouterContacted}
          providerNote="No provider contact is reported for the current view. Local checks, unavailable states, and PII blocks do not contact OpenRouter."
        />
        <p className="small muted" style={{ marginTop: 14 }}><LockKeyhole size={14} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> AI output may be incorrect, incomplete, or outdated. Related resources do not validate it. No conversation is automatically saved.</p>
      </div>
    </div>
  );
}
