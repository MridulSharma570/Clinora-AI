import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GuidedStep } from "@/features/guided-check/guided-step";

export const metadata: Metadata = { title: "General topic · Guided Check" };
export default function BodyAreaPage() { return <ConsentGate><GuidedStep step="body-area" /></ConsentGate>; }
