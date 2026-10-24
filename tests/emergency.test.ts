import { describe, expect, it } from "vitest";
import { assessEmergency } from "@/lib/safety/emergency";

describe("deterministic emergency router", () => {
  it.each([
    ["I have severe chest pain", "chest-warning"],
    ["Sudden chest pressure", "chest-warning"],
    ["I have serious trouble breathing", "breathing-crisis"],
    ["My lips are blue and my face is blue", "breathing-crisis"],
    ["One-sided weakness", "stroke-like-signs"],
    ["My face is drooping", "stroke-like-signs"],
    ["Sudden speech trouble", "stroke-like-signs"],
    ["Sudden fainting", "consciousness-confusion"],
    ["Loss of consciousness", "consciousness-confusion"],
    ["Severe uncontrolled bleeding", "severe-bleeding"],
    ["Severe allergic reaction", "allergic-reaction"],
    ["Swelling of my tongue", "allergic-reaction"],
    ["Suspected overdose", "overdose-poisoning"],
    ["I am having a seizure", "active-seizure"],
    ["Active seizure", "active-seizure"],
    ["Repeated seizures", "active-seizure"],
    ["Serious injury", "serious-injury"],
  ])("routes physical emergency example %s", (text, ruleId) => {
    const result = assessEmergency(text);
    expect(result.shouldRoute).toBe(true);
    expect(result.matches.map((match) => match.id)).toContain(ruleId);
    expect(result.matches.every((match) => !("systemPrompt" in match))).toBe(true);
  });

  it.each([
    "I am suicidal",
    "I want to kill myself",
    "I want to end my life",
    "I am thinking about self-harm",
    "I do not want to live",
    "I might hurt myself",
    "I want to harm someone else",
    "Immediate danger to myself",
  ])("routes crisis language before AI: %s", (text) => {
    const result = assessEmergency(text);
    expect(result.shouldRoute).toBe(true);
    expect(result.matches.some((match) => match.category === "crisis")).toBe(true);
  });

  it.each([
    "How can I prepare questions for an appointment?",
    "A mild concern started about two weeks ago",
    "I want to understand what to track before my visit",
    "How can I protect my privacy online?",
    "I do not have chest pressure",
  ])("does not claim an emergency for benign preparation text: %s", (text) => {
    expect(assessEmergency(text).shouldRoute).toBe(false);
  });

  it("normalizes compatibility characters and ignores zero-width characters", () => {
    expect(assessEmergency("Ｓｕｄｄｅｎ\u200b fainting").shouldRoute).toBe(true);
  });
});
