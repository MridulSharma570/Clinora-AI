import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GuidedStep } from "@/features/guided-check/guided-step";

export const metadata: Metadata = { title: "Main concern · Guided Check" };
export default function ConcernPage() { return <ConsentGate><GuidedStep step="concern" /></ConsentGate>; }
