import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GuidedStep } from "@/features/guided-check/guided-step";

export const metadata: Metadata = { title: "Optional context · Guided Check" };
export default function ContextPage() { return <ConsentGate><GuidedStep step="context" /></ConsentGate>; }
