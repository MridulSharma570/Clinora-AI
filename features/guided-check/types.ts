export interface GuidedCheckDraft {
  concern: string;
  bodyArea: string;
  started: string;
  change: string;
  severity: string;
  context: string;
  hopes: string;
}

export const emptyGuidedCheckDraft: GuidedCheckDraft = {
  concern: "",
  bodyArea: "",
  started: "",
  change: "",
  severity: "",
  context: "",
  hopes: "",
};

export const bodyAreaOptions = [
  "Head, senses, or thinking",
  "Chest, breathing, or heart topic",
  "Stomach, digestion, or urinary topic",
  "Muscles, joints, or movement",
  "Skin, hair, or nails",
  "Sleep, energy, or daily wellbeing",
  "Emotions, stress, or mood",
  "Another general topic",
] as const;

export const changeOptions = [
  "Staying about the same",
  "Getting more noticeable",
  "Getting less noticeable",
  "Coming and going",
  "Changing in a way I cannot easily describe",
] as const;

export const severityOptions = [
  "Mild — noticeable but not limiting me much",
  "Moderate — affecting some usual activities",
  "Severe — strongly affecting usual activities",
  "Hard to describe — I would rather explain in person",
] as const;

export type GuidedCheckField = keyof GuidedCheckDraft;
