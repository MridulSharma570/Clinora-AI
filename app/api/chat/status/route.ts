import { isAiConfigured } from "@/lib/ai/config";

export const dynamic = "force-dynamic";

export function GET(): Response {
  return Response.json(
    { configured: isAiConfigured() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
