import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Terms of Use" };
export default function TermsPage() { return <LegalDocument slug="terms" />; }
