import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GuidedStep } from "@/features/guided-check/guided-step";

export const metadata: Metadata = { title: "Your questions · Guided Check" };
export default function QuestionsPage() { return <ConsentGate><GuidedStep step="questions" /></ConsentGate>; }
