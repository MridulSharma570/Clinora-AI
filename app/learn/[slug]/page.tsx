import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, FileQuestion, ShieldCheck } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui/card";
import { GlassLink } from "@/components/ui/button";
import { getKnowledgeEntries, getKnowledgeEntry } from "@/lib/retrieval/knowledge";
import { articleGuidance } from "@/content/knowledge-articles";

export function generateStaticParams() {
  return getKnowledgeEntries().map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getKnowledgeEntry(slug);
  return { title: entry ? entry.title : "Guide not found" };
}

export default async function KnowledgeArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getKnowledgeEntry(slug);
  if (!entry) notFound();
  const guidance = articleGuidance[entry.id];

  return (
    <div className="reading-wrap">
      <Link href="/learn" className="inline-link" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 20 }}><ArrowLeft size={16} aria-hidden="true" /> All original guides</Link>
      <GlassCard className="article">
        <header className="article-header">
          <Badge tone={entry.category === "AI understanding" ? "violet" : "sea"}>{entry.category}</Badge>
          <h1>{entry.title}</h1>
          <p>{entry.originalSummary}</p>
        </header>
        <div className="article-body">
          {guidance && (
            <>
              <h2>Three things to keep in mind</h2>
              <ul className="question-list">
                {guidance.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
              </ul>
              <h2>A simple way to practice</h2>
              <p>{guidance.practice}</p>
              <GlassCard style={{ padding: 20, marginTop: 24 }}>
                <h2 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 9 }}><CheckCircle2 size={20} className="text-sea" aria-hidden="true" /> A question to reflect on</h2>
                <p style={{ marginBottom: 0 }}>{guidance.reflection}</p>
              </GlassCard>
            </>
          )}
          <div className="status-banner status-banner-warning" style={{ marginTop: 28 }}>
            <ShieldCheck size={20} aria-hidden="true" />
            <p><strong>General education only.</strong>This guide cannot assess your situation, diagnose, or recommend treatment. If you may be experiencing an emergency, contact local emergency services now.</p>
          </div>
          <div className="source-box">
            <p><strong>External reference supplied to Clinora AI</strong></p>
            <p><a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="inline-link">{entry.sourceOrganization} <ExternalLink size={13} aria-hidden="true" style={{ verticalAlign: "text-top" }} /></a></p>
            <p>Original summary reviewed: <time dateTime={entry.lastReviewed}>{entry.lastReviewed}</time></p>
            <p>{entry.licenseOrUsageNote} The linked organization does not endorse or validate this guide or any AI output.</p>
          </div>
          <div className="hero-actions">
            <GlassLink href="/check"><FileQuestion size={17} aria-hidden="true" /> Prepare a question list <ArrowUpRight size={16} aria-hidden="true" /></GlassLink>
            <GlassLink href="/learn" variant="secondary">Keep learning</GlassLink>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
