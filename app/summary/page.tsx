import type { Metadata } from "next";
import { ConsentGate } from "@/components/safety/consent-gate";
import { VisitSummaryView } from "@/features/summary/visit-summary";

export const metadata: Metadata = { title: "Clinician Question List" };
export default function SummaryPage() { return <ConsentGate><VisitSummaryView /></ConsentGate>; }
