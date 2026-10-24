import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Scale, ShieldCheck } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui/card";
import { legalDocuments } from "@/content/legal";

export const metadata: Metadata = { title: "Legal, privacy, and safety" };

export default function LegalIndexPage() {
  return (
    <div className="reading-wrap">
      <header className="page-header">
        <div>
          <p className="eyebrow">Clear boundaries, in writing</p>
          <h1 className="page-title">Legal, privacy & safety.</h1>
          <p className="page-description">Student-project templates describing educational scope, local data, AI limitations, security, and open-source attribution.</p>
        </div>
        <Badge><Scale size={13} aria-hidden="true" /> Review required</Badge>
      </header>
      <div className="legal-template-notice"><strong>Not legal advice.</strong> These are student-project templates. Professional legal review is required before public or commercial use. [Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date]</div>
      <div className="legal-index-grid">
        {Object.values(legalDocuments).map((document) => (
          <Link href={`/legal/${document.slug}`} className="legal-index-link" key={document.slug}>
            <div><strong>{document.title}</strong><span>{document.description}</span></div><ArrowUpRight size={18} className="text-sea" aria-hidden="true" />
          </Link>
        ))}
      </div>
      <GlassCard className="glass-card-padded" style={{ marginTop: 24 }}>
        <ShieldCheck size={24} className="text-sea" aria-hidden="true" />
        <h2 className="section-heading" style={{ marginTop: 16 }}>The short version</h2>
        <p className="muted">Clinora AI is educational, not medical advice. It does not diagnose, prescribe, treat, or interpret tests. AI can be wrong or incomplete. Emergencies require local emergency services. Health summaries remain local only if you explicitly save them, and there are no cloud accounts, analytics, ads, or trackers.</p>
      </GlassCard>
    </div>
  );
}
