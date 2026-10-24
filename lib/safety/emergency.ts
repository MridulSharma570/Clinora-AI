export type EmergencyCategory = "physical" | "crisis";

export interface EmergencyRuleMatch {
  id: string;
  category: EmergencyCategory;
  label: string;
}

export interface EmergencyAssessment {
  shouldRoute: boolean;
  matches: EmergencyRuleMatch[];
}

interface EmergencyRule extends EmergencyRuleMatch {
  patterns: RegExp[];
}

const rules: EmergencyRule[] = [
  {
    id: "crisis-self-harm",
    category: "crisis",
    label: "Self-harm, suicide, or immediate-danger wording",
    patterns: [
      /\bsuicid(?:e|al|ality)\b/i,
      /\b(?:kill|end)\s+(?:myself|my\s+life)\b/i,
      /\bend\s+it\s+all\b/i,
      /\bself[-\s]?harm(?:ing)?\b/i,
      /\b(?:hurt|harm|injure)\s+myself\b/i,
      /\b(?:do(?:n['’]?t|\s+not)\s+want\s+to\s+live|want\s+to\s+die)\b/i,
      /\b(?:kill|hurt|harm)\s+(?:someone|somebody|others|him|her|them)\b/i,
      /\bimmediate\s+danger\s+to\s+(?:myself|others|someone)\b/i,
    ],
  },
  {
    id: "breathing-crisis",
    category: "physical",
    label: "Serious breathing or blue-lips wording",
    patterns: [
      /\b(?:can(?:not|['’]t)|unable\s+to)\s+breathe\b/i,
      /\b(?:serious|severe|sudden)?\s*trouble\s+breathing\b/i,
      /\b(?:severe|serious)\s+shortness\s+of\s+breath\b/i,
      /\bnot\s+breathing\s+normally\b/i,
      /\b(?:blue|gray|grey|purple)\s+(?:lips|face)\b/i,
      /\b(?:lips|face)\s+(?:are|look|appear|turned)\s+(?:blue|gray|grey|purple)\b/i,
      /\bgasping\s+for\s+(?:air|breath)\b/i,
    ],
  },
  {
    id: "stroke-like-signs",
    category: "physical",
    label: "One-sided weakness, face-drooping, or sudden speech wording",
    patterns: [
      /\b(?:one[-\s]sided|one\s+side\s+of\s+(?:my|the)\s+(?:body|face))\s+(?:weakness|weak|numbness|numb|drooping)\b/i,
      /\b(?:weakness|numbness)\s+(?:on|in)\s+(?:one|the\s+left|the\s+right)\s+side\b/i,
      /\bface\s+(?:is\s+)?(?:drooping|drooped|droop)\b/i,
      /\b(?:sudden|new)\s+(?:speech\s+trouble|trouble\s+speaking|slurred\s+speech)\b/i,
      /\bcan(?:not|['’]t)\s+(?:speak|talk)\s+suddenly\b/i,
    ],
  },
  {
    id: "chest-warning",
    category: "physical",
    label: "Severe or sudden chest-pressure/pain wording",
    patterns: [
      /\b(?:severe|sudden|crushing|intense|worst)\s+(?:chest\s+)?(?:pain|pressure|tightness)\b/i,
      /\b(?:severe|sudden|crushing|intense)\s+pain\s+in\s+(?:my\s+|the\s+)?chest\b/i,
      /\bchest\s+(?:pressure|tightness)\b/i,
      /\bpressure\s+(?:in|on)\s+(?:my\s+|the\s+)?chest\b/i,
    ],
  },
  {
    id: "consciousness-confusion",
    category: "physical",
    label: "Collapse, consciousness, or severe-confusion wording",
    patterns: [
      /\b(?:sudden(?:ly)?\s+)?(?:fainted|fainting|collapsed|collapse)\b/i,
      /\b(?:loss\s+of\s+consciousness|lost\s+consciousness|unconscious|unresponsive)\b/i,
      /\bsevere\s+confusion\b/i,
      /\bsudden(?:ly)?\s+(?:very\s+)?confused\b/i,
    ],
  },
  {
    id: "severe-bleeding",
    category: "physical",
    label: "Severe or uncontrolled-bleeding wording",
    patterns: [
      /\b(?:severe|heavy|uncontrolled|unstoppable)\s+bleeding\b/i,
      /\bbleeding\s+(?:will\s+not|won['’]?t|can(?:not|['’]t))\s+stop\b/i,
      /\bspurting\s+blood\b/i,
    ],
  },
  {
    id: "allergic-reaction",
    category: "physical",
    label: "Severe allergic-reaction or face/throat-swelling wording",
    patterns: [
      /\b(?:severe|serious)\s+allergic\s+reaction\b/i,
      /\banaphyl(?:axis|actic)\b/i,
      /\b(?:face|mouth|tongue|throat|lips)\s+(?:is\s+|are\s+)?swelling\b/i,
      /\bswelling\s+(?:of|in)\s+(?:my\s+|the\s+)?(?:face|mouth|tongue|throat)\b/i,
    ],
  },
  {
    id: "overdose-poisoning",
    category: "physical",
    label: "Overdose or poisoning wording",
    patterns: [
      /\b(?:suspected\s+)?overdose(?:d)?\b/i,
      /\b(?:poisoned|poisoning|toxic\s+ingestion)\b/i,
      /\b(?:took|swallowed|ingested)\s+(?:an\s+unknown\s+amount|too\s+many\s+pills)\b/i,
    ],
  },
  {
    id: "active-seizure",
    category: "physical",
    label: "Active or repeated-seizure wording",
    patterns: [
      /\b(?:having|having\s+an\s+active|in)\s+(?:a\s+)?seizure\b/i,
      /\bactive\s+seizure\b/i,
      /\bseizure\s+(?:will\s+not|won['’]?t|can(?:not|['’]t))\s+stop\b/i,
      /\b(?:repeated|back[-\s]to[-\s]back|multiple)\s+seizures\b/i,
    ],
  },
  {
    id: "serious-injury",
    category: "physical",
    label: "Serious-injury or major-trauma wording",
    patterns: [
      /\b(?:serious|severe|major)\s+(?:injury|trauma|burn|accident)\b/i,
      /\bbone\s+(?:is\s+)?(?:sticking|protruding)\s+out\b/i,
      /\bserious\s+head\s+injury\b/i,
    ],
  },
];

function normalize(input: string): string {
  return input
    .normalize("NFKC")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 12_000);
}

/** Deterministic examples only; a no-match result is not an emergency assessment. */
export function assessEmergency(input: string): EmergencyAssessment {
  const normalized = normalize(input);
  if (!normalized) return { shouldRoute: false, matches: [] };

  // A narrow standalone denial avoids an obvious false positive. Any additional
  // uncertain or high-risk wording is still evaluated conservatively by every rule.
  const isolatedChestDenial = /^(?:i\s+)?(?:(?:do\s+not|don['’]?t)\s+have|no)\s+chest\s+(?:pressure|pain|tightness)[.!]?$/i.test(normalized);

  const matches = rules
    .filter((rule) => !(isolatedChestDenial && rule.id === "chest-warning"))
    .filter((rule) => rule.patterns.some((pattern) => pattern.test(normalized)))
    .map(({ id, category, label }) => ({ id, category, label }));

  return { shouldRoute: matches.length > 0, matches };
}

export function emergencyMatchesFromText(input: string): EmergencyRuleMatch[] {
  return assessEmergency(input).matches;
}
