import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Data Governance" };
export default function DataGovernancePage() { return <LegalDocument slug="data-governance" />; }
