import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Security" };
export default function SecurityPage() { return <LegalDocument slug="security" />; }
