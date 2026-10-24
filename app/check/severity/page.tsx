import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GuidedStep } from "@/features/guided-check/guided-step";

export const metadata: Metadata = { title: "Daily impact · Guided Check" };
export default function SeverityPage() { return <ConsentGate><GuidedStep step="severity" /></ConsentGate>; }
