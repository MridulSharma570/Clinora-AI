"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, FileQuestion, Pencil, ShieldCheck } from "lucide-react";
import { useApp } from "@/components/layout/app-provider";
import { Button, GlassLink } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";
import { PrivacyReminder } from "@/components/safety/privacy-reminder";
import { ExplainabilityPanel } from "@/components/safety/explainability-panel";
import { assessEmergency } from "@/lib/safety/emergency";
import {
  bodyAreaOptions,
  changeOptions,
  severityOptions,
} from "@/features/guided-check/types";

export type GuidedStepName = "concern" | "body-area" | "timeline" | "severity" | "context" | "questions" | "review";

const steps: { id: GuidedStepName; label: string; path: string }[] = [
  { id: "concern", label: "Main concern", path: "/check/concern" },
  { id: "body-area", label: "General topic", path: "/check/body-area" },
  { id: "timeline", label: "Timeline", path: "/check/timeline" },
  { id: "severity", label: "Daily impact", path: "/check/severity" },
  { id: "context", label: "Optional context", path: "/check/context" },
  { id: "questions", label: "Your questions", path: "/check/questions" },
  { id: "review", label: "Review", path: "/check/review" },
];

const content: Record<GuidedStepName, { title: string; intro: string }> = {
  concern: {
    title: "What would you like to talk about?",
    intro: "Start with your main concern in everyday language. You do not need a medical term or a neat explanation.",
  },
  "body-area": {
    title: "Which general topic fits best?",
    intro: "This simply organizes your story. It does not match symptoms to a condition or create a score.",
  },
  timeline: {
    title: "When did it start, and what changed?",
    intro: "A rough timeline is enough. Mention whether it is constant, comes and goes, or feels different now.",
  },
  severity: {
    title: "How is it affecting your day?",
    intro: "Describe impact in plain language. This is not a clinical severity or triage score.",
  },
  context: {
    title: "Anything else you want to remember?",
    intro: "Optional context can include triggers, routines, or daily impact. Share only what you are comfortable discussing.",
  },
  questions: {
    title: "What do you want to understand?",
    intro: "Note a worry, a hope for the visit, or a question you do not want to forget.",
  },
  review: {
    title: "Review your story, in your words.",
    intro: "Check for clarity and remove identifying details. The next step creates an educational question list locally—never a diagnosis.",
  },
};

export function GuidedStep({ step }: { step: GuidedStepName }) {
  const { draft, updateDraft, recordSafetyEvent } = useApp();
  const [error, setError] = useState("");
  const router = useRouter();
  const index = steps.findIndex((item) => item.id === step);
  const next = steps[index + 1];
  const previous = steps[index - 1];
  const current = content[step];

  const routeIfEmergency = () => {
    const assessment = assessEmergency(Object.values(draft).join(" "));
    if (!assessment.shouldRoute) return false;
    recordSafetyEvent({ matches: assessment.matches, source: "guided-check" });
    router.push("/emergency");
    return true;
  };

  const continueFlow = () => {
    setError("");
    if (step === "concern" && draft.concern.trim().length < 3) {
      setError("Please add a few words about your main concern.");
      return;
    }
    if (step === "body-area" && !draft.bodyArea) {
      setError("Please choose a general topic, including “Another general topic” if none fit.");
      return;
    }
    if (step === "timeline" && (!draft.started.trim() || !draft.change)) {
      setError("Please add a rough starting point and choose how the concern has changed.");
      return;
    }
    if (step === "severity" && !draft.severity) {
      setError("Please choose the closest plain-language description.");
      return;
    }
    if (routeIfEmergency()) return;
    if (next) router.push(next.path);
  };

  const createSummary = () => {
    setError("");
    const missing = [draft.concern, draft.bodyArea, draft.started, draft.change, draft.severity].some((value) => !value.trim());
    if (missing) {
      setError("Please complete the required steps before creating your summary. Optional context and your own question can remain blank.");
      return;
    }
    if (routeIfEmergency()) return;
    router.push("/summary");
  };

  return (
    <div className="reading-wrap">
      <div className="step-progress" aria-label={`Step ${index + 1} of ${steps.length}: ${steps[index]?.label}`}>
        <div className="step-progress-top"><span>Guided Check · {steps[index]?.label}</span><span>{index + 1} / {steps.length}</span></div>
        <div className="progress-track" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={index + 1} aria-label="Guided Check progress">
          <div className="progress-fill" style={{ width: `${((index + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <GlassCard className="step-card">
        <Badge tone={step === "review" ? "violet" : "sea"}>{step === "review" ? "Ready when you are" : "Your words, your pace"}</Badge>
        <h1 style={{ marginTop: 18 }}>{current.title}</h1>
        <p className="step-intro">{current.intro}</p>
        {step !== "review" && <PrivacyReminder />}

        {step === "concern" && (
          <div className="field">
            <label htmlFor="concern" className="form-label">Main concern in your own words</label>
            <textarea id="concern" className="form-textarea" value={draft.concern} maxLength={1200} onChange={(event) => updateDraft("concern", event.target.value)} placeholder="For example: I’ve noticed a change that I would like to understand and talk through…" aria-describedby="concern-help" autoFocus />
            <div className="field-meta"><p id="concern-help" className="field-help">Avoid names and record details. You can edit this on the review step.</p><span className="field-help">{draft.concern.length}/1200</span></div>
          </div>
        )}

        {step === "body-area" && (
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="form-label" style={{ marginBottom: 12 }}>General body area or topic</legend>
            <div className="choice-grid">
              {bodyAreaOptions.map((option) => (
                <label className="choice-card" key={option}>
                  <input type="radio" name="bodyArea" checked={draft.bodyArea === option} onChange={() => updateDraft("bodyArea", option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === "timeline" && (
          <div className="form-stack">
            <div className="field">
              <label htmlFor="started" className="form-label">When did you first notice it?</label>
              <input id="started" className="form-input" value={draft.started} maxLength={200} onChange={(event) => updateDraft("started", event.target.value)} placeholder="For example: about two weeks ago, or gradually over a few months" />
              <p className="field-help">A rough estimate is fine. No exact date of birth or identity details.</p>
            </div>
            <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="form-label" style={{ marginBottom: 12 }}>Has anything changed?</legend>
              <div className="choice-grid">
                {changeOptions.map((option) => (
                  <label className="choice-card" key={option}>
                    <input type="radio" name="change" checked={draft.change === option} onChange={() => updateDraft("change", option)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === "severity" && (
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="form-label" style={{ marginBottom: 12 }}>Which description is closest?</legend>
            <div className="choice-grid">
              {severityOptions.map((option) => (
                <label className="choice-card" key={option}>
                  <input type="radio" name="severity" checked={draft.severity === option} onChange={() => updateDraft("severity", option)} />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <p className="field-help" style={{ marginTop: 12 }}>If you may be experiencing an emergency, use the Emergency link now instead of completing this form.</p>
          </fieldset>
        )}

        {step === "context" && (
          <div className="field">
            <label htmlFor="context" className="form-label">Optional context <span className="optional">Optional</span></label>
            <textarea id="context" className="form-textarea" value={draft.context} maxLength={1500} onChange={(event) => updateDraft("context", event.target.value)} placeholder="Timing, triggers, routines, activities that feel different, or anything else you want to remember…" />
            <div className="field-meta"><p className="field-help">You can leave this blank and continue.</p><span className="field-help">{draft.context.length}/1500</span></div>
          </div>
        )}

        {step === "questions" && (
          <div className="field">
            <label htmlFor="hopes" className="form-label">What are you worried about or hoping to ask? <span className="optional">Optional</span></label>
            <textarea id="hopes" className="form-textarea" value={draft.hopes} maxLength={1000} onChange={(event) => updateDraft("hopes", event.target.value)} placeholder="For example: I want to understand what happens next and what I should keep track of…" />
            <div className="field-meta"><p className="field-help">Your question will appear as your own question, not as an AI conclusion.</p><span className="field-help">{draft.hopes.length}/1000</span></div>
          </div>
        )}

        {step === "review" && (
          <div>
            <dl className="review-list">
              {([
                ["Main concern", draft.concern, "/check/concern"],
                ["General topic", draft.bodyArea, "/check/body-area"],
                ["When it started", draft.started, "/check/timeline"],
                ["How it changed", draft.change, "/check/timeline"],
                ["Daily impact", draft.severity, "/check/severity"],
                ["Optional context", draft.context || "No optional context added", "/check/context"],
                ["Your worry or question", draft.hopes || "No own question added", "/check/questions"],
              ] satisfies [string, string, string][]).map(([label, value, href]) => (
                <div className="review-row" key={label}>
                  <dt>{label} <Link href={href} className="inline-link" aria-label={`Edit ${label}`}><Pencil size={12} aria-hidden="true" /></Link></dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {step === "review" && (
          <div className="status-banner status-banner-info" style={{ marginTop: 22 }}>
            <ShieldCheck size={20} aria-hidden="true" />
            <p><strong>Local generation only.</strong>No OpenRouter request is used for this summary. It will not be saved unless you explicitly press Save on the next page.</p>
          </div>
        )}
        {error && <p className="error-text" role="alert" style={{ marginTop: 14 }}>{error}</p>}

        <div className="step-actions">
          {previous ? <GlassLink href={previous.path} variant="ghost"><ArrowLeft size={17} aria-hidden="true" /> Back</GlassLink> : <GlassLink href="/check" variant="ghost"><ArrowLeft size={17} aria-hidden="true" /> Introduction</GlassLink>}
          {step === "review" ? (
            <Button onClick={createSummary}><FileQuestion size={17} aria-hidden="true" /> Create question list <Check size={17} aria-hidden="true" /></Button>
          ) : (
            <Button onClick={continueFlow}>Continue <ArrowRight size={17} aria-hidden="true" /></Button>
          )}
        </div>
      </GlassCard>

      <ExplainabilityPanel
        safetyRule="A deterministic local emergency phrase scan runs on all current draft text whenever you continue. A no-match result is not an emergency assessment."
        localData="Your current Guided Check draft is held in React memory only. It is not written to localStorage or sent to OpenRouter. Reloading may discard it."
        openRouterContacted={false}
      />
    </div>
  );
}
