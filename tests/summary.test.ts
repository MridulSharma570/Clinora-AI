import { describe, expect, it } from "vitest";
import { emptyGuidedCheckDraft } from "@/features/guided-check/types";
import { generateVisitSummary } from "@/features/summary/generate-summary";

const draft = {
  ...emptyGuidedCheckDraft,
  concern: "A change I want to discuss",
  bodyArea: "Sleep, energy, or daily wellbeing",
  started: "About two weeks ago",
  change: "Coming and going",
  severity: "Mild — noticeable but not limiting me much",
  hopes: "What should I track?",
};

describe("local Clinician Question List", () => {
  it("preserves the user's words and generates useful questions", () => {
    const summary = generateVisitSummary(draft, new Date("2026-10-24T12:00:00Z"));
    expect(summary.concern).toBe(draft.concern);
    expect(summary.plainText).toContain(draft.started);
    expect(summary.questions.join(" ")).toContain("What changed and when");
    expect(summary.questions.join(" ")).toContain("warning signs");
    expect(summary.questions.join(" ")).toContain("My own question: What should I track?");
    expect(summary.gaps).toEqual([]);
  });

  it("politely identifies missing information", () => {
    const summary = generateVisitSummary({ ...emptyGuidedCheckDraft, concern: "My concern" });
    expect(summary.gaps.length).toBeGreaterThan(2);
    expect(summary.gaps.join(" ")).toContain("Timing was not added");
  });

  it("does not generate a diagnosis, disease ranking, treatment plan, or probability", () => {
    const text = generateVisitSummary(draft).plainText;
    expect(text).not.toMatch(/likely diagnosis|disease ranking|your chance|\d+%\s*risk|take \d+\s*(mg|ml|tablets?)/i);
    expect(text).toContain("not a diagnosis or medical advice");
  });
});
