import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "AI Transparency" };
export default function AiTransparencyPage() { return <LegalDocument slug="ai-transparency" />; }
