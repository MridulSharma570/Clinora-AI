import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GuidedStep } from "@/features/guided-check/guided-step";

export const metadata: Metadata = { title: "Review · Guided Check" };
export default function ReviewPage() { return <ConsentGate><GuidedStep step="review" /></ConsentGate>; }
