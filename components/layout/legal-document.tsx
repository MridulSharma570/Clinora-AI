import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui/card";
import { legalDocuments } from "@/content/legal";
import { notFound } from "next/navigation";

export function LegalDocument({ slug }: { slug: string }) {
  const document = legalDocuments[slug];
  if (!document) notFound();

  return (
    <div className="reading-wrap">
      <Link href="/legal" className="inline-link" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 20 }}><ArrowLeft size={16} aria-hidden="true" /> Legal & safety index</Link>
      <GlassCard className="legal-document">
        <Badge tone="violet">Student-project template</Badge>
        <h1>{document.title}</h1>
        <p className="page-description">{document.description}</p>
        <div className="legal-template-notice">
          <strong>Not legal advice.</strong> Professional legal review is required before public or commercial use. Placeholders: [Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date].
        </div>
        <div className="legal-body">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
          <div className="status-banner status-banner-warning" style={{ marginTop: 34 }}>
            <ShieldCheck size={20} aria-hidden="true" />
            <p><strong>Educational, not medical advice.</strong>Clinora AI does not diagnose, prescribe, treat, or interpret tests. AI output may be incorrect, incomplete, or outdated. In a possible emergency, contact local emergency services. Summaries are local only after explicit Save; no cloud accounts/records, analytics, ads, or trackers exist. OpenRouter receives current chat content and selected original cards only after user action.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
