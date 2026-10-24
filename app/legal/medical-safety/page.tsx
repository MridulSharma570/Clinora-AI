import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Medical Safety" };
export default function MedicalSafetyPage() { return <LegalDocument slug="medical-safety" />; }
