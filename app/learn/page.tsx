import type { Metadata } from "next";
import { BookOpen, ShieldCheck } from "lucide-react";
import { KnowledgeExplorer } from "@/features/guided-check/knowledge-explorer";
import { Badge } from "@/components/ui/card";

export const metadata: Metadata = { title: "Learn · Original health-visit preparation guides" };

export default function LearnPage() {
  return (
    <div className="content-wrap">
      <header className="page-header">
        <div>
          <p className="eyebrow">Learn at your own pace</p>
          <h1 className="page-title">Small guides for better conversations.</h1>
          <p className="page-description">Original Clinora AI educational summaries about preparing, privacy, and AI limitations. No scraped articles or medical encyclopedia content.</p>
        </div>
        <Badge><BookOpen size={13} aria-hidden="true" /> Original local library</Badge>
      </header>
      <div className="status-banner status-banner-info" style={{ marginBottom: 26 }}>
        <ShieldCheck size={20} aria-hidden="true" />
        <p><strong>Education, not individual medical advice.</strong>External organization links are references only and do not endorse or validate Clinora AI. For possible emergencies, use local emergency services.</p>
      </div>
      <KnowledgeExplorer />
    </div>
  );
}
