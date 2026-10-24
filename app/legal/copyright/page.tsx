import type { Metadata } from "next";
import { LegalDocument } from "@/components/layout/legal-document";
export const metadata: Metadata = { title: "Copyright and Trademark" };
export default function CopyrightPage() { return <LegalDocument slug="copyright" />; }
