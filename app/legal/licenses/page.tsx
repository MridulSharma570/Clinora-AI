import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Open-Source Licenses" };
export default function LicensesPage() { return <LegalDocument slug="licenses" />; }
