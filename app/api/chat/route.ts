import { getOpenRouterConfig } from "@/lib/ai/config";
import { AI_UNAVAILABLE_MESSAGE, SAFE_BOUNDARY_MESSAGE, assessAiOutput } from "@/lib/ai/output-safety";
import { requestOpenRouterCompletion } from "@/lib/ai/openrouter";
import { detectPii, piiEditMessage } from "@/lib/privacy/pii";
import { retrieveKnowledge } from "@/lib/retrieval/search";
import { validateKnowledgeResources } from "@/lib/retrieval/knowledge";
import { assessEmergency } from "@/lib/safety/emergency";
import { chatRequestSchema } from "@/lib/validation/chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStoreHeaders = { "Cache-Control": "no-store" };

function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: noStoreHeaders });
}

function unavailableResponse(status: 502 | 503): Response {
  return jsonResponse({ kind: "unavailable", message: AI_UNAVAILABLE_MESSAGE }, status);
}

function streamValidatedAnswer(text: string, resourceIds: string[]): Response {
  const resources = validateKnowledgeResources(resourceIds);
  const encoder = new TextEncoder();
  const characters = Array.from(text);

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (event: unknown) => controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      send({ type: "meta", resources, openRouterContacted: true });
      for (let index = 0; index < characters.length; index += 180) {
        send({ type: "delta", text: characters.slice(index, index + 180).join("") });
      }
      send({ type: "done" });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      ...noStoreHeaders,
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ kind: "invalid", message: "Please review your message and try again." }, 400);
  }

  if (rawBody.length > 16_000) {
    return jsonResponse({ kind: "invalid", message: "Please shorten your message and try again." }, 400);
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ kind: "invalid", message: "Please review your message and try again." }, 400);
  }

  // Consent is an attestation, not identity verification. Check it before the
  // full message schema and before any safety, retrieval, or provider work.
  if (typeof json === "object" && json !== null && !Array.isArray(json)) {
    const attestation = json as Record<string, unknown>;
    if (attestation.consentConfirmed !== true || attestation.adultConfirmed !== true) {
      return jsonResponse({ kind: "consent", message: "Adult consent is required before using AI chat." }, 403);
    }
  }

  const parsed = chatRequestSchema.safeParse(json);
  if (!parsed.success) {
    return jsonResponse({ kind: "invalid", message: "Please enter a message between 1 and 2,000 characters." }, 400);
  }

  const emergency = assessEmergency(parsed.data.message);
  if (emergency.shouldRoute) {
    return jsonResponse(
      {
        kind: "emergency",
        redirect: "/emergency",
        signals: emergency.matches.map(({ id, category, label }) => ({ id, category, label })),
      },
      422,
    );
  }

  const piiMatches = detectPii(parsed.data.message);
  if (piiMatches.length > 0) {
    return jsonResponse({ kind: "pii", message: piiEditMessage(piiMatches) }, 422);
  }

  const config = getOpenRouterConfig();
  if (!config) return unavailableResponse(503);

  const cards = retrieveKnowledge(parsed.data.message, 3);

  let output: string;
  try {
    output = await requestOpenRouterCompletion(config, parsed.data.message, cards);
  } catch {
    return unavailableResponse(502);
  }

  const outputEmergency = assessEmergency(output);
  if (outputEmergency.shouldRoute) {
    return jsonResponse({
      kind: "emergency",
      redirect: "/emergency",
      signals: outputEmergency.matches.map(({ id, category, label }) => ({ id, category, label })),
    });
  }

  const outputAssessment = assessAiOutput(output);
  if (!outputAssessment.safe) {
    return jsonResponse({ kind: "blocked", message: SAFE_BOUNDARY_MESSAGE });
  }

  return streamValidatedAnswer(output.trim(), cards.map((card) => card.id));
}
