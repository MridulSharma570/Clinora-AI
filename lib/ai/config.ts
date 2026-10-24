export interface OpenRouterConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

export function getOpenRouterConfig(): OpenRouterConfig | null {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  const model = process.env.OPENROUTER_MODEL?.trim();
  if (!apiKey || !model) return null;

  const baseUrl = (process.env.OPENROUTER_BASE_URL?.trim() || "https://openrouter.ai/api/v1").replace(/\/+$/, "");
  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    return null;
  }

  if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash) {
    return null;
  }

  return { apiKey, model, baseUrl: parsed.toString().replace(/\/+$/, "") };
}

export function isAiConfigured(): boolean {
  return getOpenRouterConfig() !== null;
}
