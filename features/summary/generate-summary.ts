import type { GuidedCheckDraft } from "@/features/guided-check/types";

export interface VisitSummary {
  title: string;
  createdAt: string;
  concern: string;
  storyRows: { label: string; value: string }[];
  questions: string[];
  gaps: string[];
  preparationPoints: string[];
  plainText: string;
}

function clean(value: string, fallback = "Not added yet"): string {
  const trimmed = value.trim();
  return trimmed || fallback;
}

export function generateVisitSummary(
  draft: GuidedCheckDraft,
  createdAt: Date = new Date(),
): VisitSummary {
  const concern = clean(draft.concern, "My main concern was not added");
  const storyRows = [
    { label: "Main concern, in my words", value: concern },
    { label: "General area or topic", value: clean(draft.bodyArea) },
    { label: "When it started", value: clean(draft.started) },
    { label: "How it has changed", value: clean(draft.change) },
    { label: "Impact in plain language", value: clean(draft.severity) },
    { label: "Optional context", value: clean(draft.context, "No optional context added") },
    { label: "What I am worried about or hope to ask", value: clean(draft.hopes) },
  ];

  const gaps: string[] = [];
  if (!draft.started.trim()) gaps.push("Timing was not added. Even a rough starting point can be useful.");
  if (!draft.change.trim()) gaps.push("Change over time was not added. You could mention whether it comes and goes.");
  if (!draft.severity.trim()) gaps.push("Daily impact was not described. You could explain which activities are easier or harder.");
  if (!draft.bodyArea.trim()) gaps.push("A general topic was not selected. You can describe this in your own words instead.");
  if (!draft.hopes.trim()) gaps.push("No specific worry or question was added. You can choose from the questions below.");

  const questions = [
    "What changed and when, and which parts of my timeline are most useful to review?",
    "What details should I mention about timing, triggers, or daily impact?",
    "What questions might help me understand the next steps for evaluating this concern?",
    "What warning signs should make me seek urgent or emergency care?",
    "What should I bring or track before my visit, and for how long should I track it?",
    "When should I follow up, and whom should I contact if anything changes?",
    ...(draft.hopes.trim() ? [`My own question: ${draft.hopes.trim()}`] : []),
  ];

  const preparationPoints = [
    "Keep a short timeline of when the concern appears, how long it lasts, and what makes the day easier or harder.",
    "Bring a list of current medicines and supplements exactly as they appear on their labels, without changing how you use them based on this app.",
    "Bring any documents a clinician or clinic specifically requested. Do not upload private records to Clinora AI.",
    "Write down what you most want to understand before the appointment ends.",
  ];

  const plainText = [
    "CLINORA AI — CLINICIAN QUESTION LIST",
    "Educational visit preparation — not a diagnosis or medical advice.",
    "",
    ...storyRows.flatMap((row) => [`${row.label}:`, row.value, ""]),
    "QUESTIONS TO CONSIDER",
    ...questions.map((question) => `- ${question}`),
    "",
    "INFORMATION GAPS",
    ...(gaps.length ? gaps.map((gap) => `- ${gap}`) : ["- No required information gaps were identified."]),
    "",
    "BEFORE THE VISIT",
    ...preparationPoints.map((point) => `- ${point}`),
  ].join("\n");

  return {
    title: concern === "My main concern was not added" ? "Visit-preparation summary" : `Visit prep: ${concern.slice(0, 72)}`,
    createdAt: createdAt.toISOString(),
    concern,
    storyRows,
    questions,
    gaps,
    preparationPoints,
    plainText,
  };
}
