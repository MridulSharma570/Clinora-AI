import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() { return <LegalDocument slug="privacy" />; }
