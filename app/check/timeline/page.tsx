import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GuidedStep } from "@/features/guided-check/guided-step";

export const metadata: Metadata = { title: "Timeline · Guided Check" };
export default function TimelinePage() { return <ConsentGate><GuidedStep step="timeline" /></ConsentGate>; }
