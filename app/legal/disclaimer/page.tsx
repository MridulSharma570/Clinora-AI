import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Medical Disclaimer" };
export default function DisclaimerPage() { return <LegalDocument slug="disclaimer" />; }
