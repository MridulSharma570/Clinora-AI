import { afterEach, describe, expect, it, vi } from "vitest";
import { getOpenRouterConfig, isAiConfigured } from "@/lib/ai/config";

describe("OpenRouter configuration", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("disables chat when the key is missing", () => {
    vi.stubEnv("OPENROUTER_API_KEY", "");
    vi.stubEnv("OPENROUTER_MODEL", "developer/free-model");
    expect(getOpenRouterConfig()).toBeNull();
    expect(isAiConfigured()).toBe(false);
  });

  it("disables chat when the model is missing", () => {
    vi.stubEnv("OPENROUTER_API_KEY", "server-only-test-value");
    vi.stubEnv("OPENROUTER_MODEL", "");
    expect(getOpenRouterConfig()).toBeNull();
  });

  it("does not hardcode a fallback model", () => {
    vi.stubEnv("OPENROUTER_API_KEY", "server-only-test-value");
    vi.stubEnv("OPENROUTER_MODEL", "developer/current-free-model");
    vi.stubEnv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1");
    expect(getOpenRouterConfig()?.model).toBe("developer/current-free-model");
  });

  it("fails closed for malformed or credentialed base URLs", () => {
    vi.stubEnv("OPENROUTER_API_KEY", "server-only-test-value");
    vi.stubEnv("OPENROUTER_MODEL", "developer/current-free-model");
    vi.stubEnv("OPENROUTER_BASE_URL", "https://user:secret@example.com/api");
    expect(getOpenRouterConfig()).toBeNull();
  });
});
