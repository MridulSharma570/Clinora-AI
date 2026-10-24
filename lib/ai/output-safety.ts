export const SAFE_BOUNDARY_MESSAGE =
  "I can help you prepare questions for a qualified clinician, but I cannot diagnose, recommend treatment, or provide medication instructions.";

export const AI_UNAVAILABLE_MESSAGE =
  "AI chat is not configured or is temporarily unavailable. You can still use Guided Check to prepare questions for a healthcare visit.";

interface UnsafePattern {
  label: string;
  pattern: RegExp;
}

const unsafePatterns: UnsafePattern[] = [
  { label: "diagnostic assertion", pattern: /\byou\s+have\b/i },
  { label: "diagnostic assertion", pattern: /\byou\s+(?:are|’re|'re)\s+diagnosed\s+with\b/i },
  { label: "diagnostic assertion", pattern: /\bdiagnos(?:is|ed)\s+(?:is\s+)?confirmed\b/i },
  { label: "clinical probability", pattern: /\byour\s+chance\s+is\b/i },
  { label: "clinical probability", pattern: /\bprobab(?:ility|le\s+diagnosis)\b/i },
  { label: "clinical probability", pattern: /\b\d+(?:\.\d+)?\s*%\s*(?:risk|chance|probability)\b/i },
  { label: "clinical probability", pattern: /\b(?:risk|chance)\s+(?:is|of)\s+\d+(?:\.\d+)?\s*%/i },
  { label: "medication dose", pattern: /\b\d+(?:\.\d+)?\s*(?:mg|mcg|ml|milligrams?|millilitres?|milliliters?|tablets?|capsules?)\b/i },
  { label: "medication instruction", pattern: /\b(?:start|stop)\s+taking\b/i },
  { label: "medication instruction", pattern: /\b(?:take|use|inject)\s+(?:\d+\s*(?:mg|mcg|ml)|ibuprofen|acetaminophen|paracetamol|aspirin|metformin|insulin|antibiotics?)\b/i },
  { label: "medication instruction", pattern: /\b(?:take|start|stop)\s+(?:your\s+|the\s+)?(?:medicine|medication|pills?)\b/i },
  { label: "treatment plan", pattern: /\b(?:your|the)\s+treatment\s+plan\s+(?:is|should be)\b/i },
  { label: "test interpretation", pattern: /\byour\s+(?:x[-\s]?ray|mri|ct|cat\s+scan|ultrasound|pathology|biopsy|lab|laboratory|blood\s+test|scan|test)\s+(?:\w+\s+){0,3}(?:shows?|means?|indicates?|confirms?)\b/i },
  { label: "unverified link", pattern: /(?:https?:\/\/|www\.|\[[^\]]+\]\([^)]+\))/i },
  { label: "unsafe markup", pattern: /<\s*(?:script|iframe|object|embed|img|form)\b|javascript:/i },
  { label: "secret disclosure", pattern: /(?:sk-or-v1-|OPENROUTER_API_KEY|Bearer\s+sk-)/i },
  { label: "hidden instruction disclosure", pattern: /\bmy\s+(?:system\s+prompt|hidden\s+instructions)\s+(?:are|say|says)\b/i },
];

export interface AiOutputAssessment {
  safe: boolean;
  reasons: string[];
}

export function assessAiOutput(output: string): AiOutputAssessment {
  const trimmed = output.trim();
  if (!trimmed || trimmed.length > 16_000 || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(trimmed)) {
    return { safe: false, reasons: ["empty, oversized, or malformed output"] };
  }

  const reasons = unsafePatterns
    .filter(({ pattern }) => pattern.test(trimmed))
    .map(({ label }) => label);

  return { safe: reasons.length === 0, reasons: [...new Set(reasons)] };
}
