import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/chat/route";
import { AI_UNAVAILABLE_MESSAGE, SAFE_BOUNDARY_MESSAGE } from "@/lib/ai/output-safety";

function request(message: string, consentConfirmed = true, adultConfirmed = true): Request {
  return new Request("http://test.local/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, consentConfirmed, adultConfirmed }),
  });
}

function completion(content: string): Response {
  return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

describe("guarded chat route pipeline", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("OPENROUTER_API_KEY", "test-only-server-value");
    vi.stubEnv("OPENROUTER_MODEL", "test-only/free-model");
    vi.stubEnv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects missing adult consent before provider access", async () => {
    const response = await POST(request("Prepare questions", false, true));
    expect(response.status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(["I have severe chest pain", "I want to kill myself"])("blocks emergency input before provider access: %s", async (message) => {
    const response = await POST(request(message));
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ kind: "emergency", redirect: "/emergency" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("blocks high-confidence PII before provider access", async () => {
    const response = await POST(request("Email me at person@example.com"));
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ kind: "pii" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns transparent unavailable behavior without configuration or provider access", async () => {
    vi.stubEnv("OPENROUTER_API_KEY", "");
    vi.stubEnv("OPENROUTER_MODEL", "");
    const response = await POST(request("Prepare questions"));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ kind: "unavailable", message: AI_UNAVAILABLE_MESSAGE });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("discards unsafe model output and returns only the safety boundary", async () => {
    fetchMock.mockResolvedValueOnce(completion("You have a condition. Take 5 mg."));
    const response = await POST(request("How can I prepare for an appointment?"));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ kind: "blocked", message: SAFE_BOUNDARY_MESSAGE });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("routes emergency language found in model output without displaying it", async () => {
    fetchMock.mockResolvedValueOnce(completion("Severe chest pressure means you should seek help."));
    const response = await POST(request("General appointment preparation"));
    expect(await response.json()).toMatchObject({ kind: "emergency", redirect: "/emergency" });
  });

  it("returns unavailable without a simulated answer when the provider fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("synthetic network failure"));
    const response = await POST(request("General appointment preparation"));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ kind: "unavailable", message: AI_UNAVAILABLE_MESSAGE });
  });

  it("buffers upstream SSE, then streams safe text with local citations only", async () => {
    const safe = "General educational information:\nA written outline can support an appointment conversation.\n\nUncertainty:\nThis may be incomplete or incorrect.";
    const sse = `data: ${JSON.stringify({ choices: [{ delta: { content: safe } }] })}\n\ndata: [DONE]\n\n`;
    fetchMock.mockResolvedValueOnce(new Response(sse, { status: 200, headers: { "Content-Type": "text/event-stream" } }));

    const response = await POST(request("How can I prepare for an appointment?"));
    expect(response.headers.get("content-type")).toContain("application/x-ndjson");
    const events = (await response.text()).trim().split("\n").map((line) => JSON.parse(line) as { type: string; text?: string; resources?: { sourceUrl: string }[] });
    expect(events.at(-1)).toEqual({ type: "done" });
    expect(events.filter((event) => event.type === "delta").map((event) => event.text).join("")).toBe(safe);
    expect(events[0]?.type).toBe("meta");
    expect(events[0]?.resources?.length).toBeGreaterThan(0);
    expect(events[0]?.resources?.every((resource) => resource.sourceUrl.startsWith("https://"))).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
