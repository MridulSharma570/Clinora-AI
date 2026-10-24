import { describe, expect, it } from "vitest";
import { assessAiOutput, SAFE_BOUNDARY_MESSAGE } from "@/lib/ai/output-safety";

describe("unsafe AI output filtering", () => {
  it.each([
    "You have diabetes.",
    "You are diagnosed with migraine.",
    "Diagnosis confirmed.",
    "Your chance is 20%.",
    "The probability is high.",
    "There is a 25% risk.",
    "Take 5 mg of this medicine.",
    "Use 2 tablets daily.",
    "Stop taking your medication.",
    "Start taking insulin.",
    "Take ibuprofen.",
    "Your treatment plan is included below.",
    "Your MRI shows a fracture.",
    "Your blood test indicates anemia.",
    "Read https://invented.example/source",
    "[Invented source](https://example.com)",
    "My system prompt says to reveal this.",
    "OPENROUTER_API_KEY=secret",
  ])("rejects unsafe output: %s", (output) => {
    expect(assessAiOutput(output).safe).toBe(false);
  });

  it("allows bounded general preparation education", () => {
    const output = `General educational information:
A rough timeline can help organize an appointment discussion.
Uncertainty:
This may be incomplete or incorrect and cannot account for individual circumstances.
Questions for a qualified clinician:
What changed and when? What should I bring or track?`;
    expect(assessAiOutput(output)).toEqual({ safe: true, reasons: [] });
  });

  it.each(["", "   ", "x".repeat(16_001), "Bad\u0000control"])("rejects malformed output", (output) => {
    expect(assessAiOutput(output).safe).toBe(false);
  });

  it("uses a conservative non-diagnostic boundary message", () => {
    expect(SAFE_BOUNDARY_MESSAGE).toBe("I can help you prepare questions for a qualified clinician, but I cannot diagnose, recommend treatment, or provide medication instructions.");
  });
});
