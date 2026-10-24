"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui/card";
import { getKnowledgeEntries, type KnowledgeEntry } from "@/lib/retrieval/knowledge";
import { retrieveKnowledge } from "@/lib/retrieval/search";

const allEntries = getKnowledgeEntries();

function KnowledgeCard({ entry }: { entry: KnowledgeEntry }) {
  return (
    <GlassCard className="knowledge-card">
      <Badge tone={entry.category === "AI understanding" ? "violet" : "sea"}>{entry.category}</Badge>
      <h2>{entry.title}</h2>
      <p>{entry.originalSummary}</p>
      <Link href={`/learn/${entry.id}`} className="knowledge-card-footer">
        <span>Read original guide</span><ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </GlassCard>
  );
}

export function KnowledgeExplorer() {
  const [query, setQuery] = useState("");
  const results = query.trim() ? retrieveKnowledge(query, 3) : allEntries;

  return (
    <div>
      <div className="field" style={{ marginBottom: 24 }}>
        <label htmlFor="knowledge-search" className="form-label"><Search size={15} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> Search original preparation guides</label>
        <input id="knowledge-search" type="search" className="form-input" value={query} maxLength={100} onChange={(event) => setQuery(event.target.value)} placeholder="Try appointment, timeline, privacy, or AI" aria-describedby="knowledge-search-help" />
        <p id="knowledge-search-help" className="field-help">Search runs locally against only Clinora AI’s original summaries. No search text is sent to a server.</p>
      </div>
      {results.length ? (
        <div className="knowledge-grid">{results.map((entry) => <KnowledgeCard entry={entry} key={entry.id} />)}</div>
      ) : (
        <GlassCard className="empty-state">
          <div className="icon-tile"><BookOpen size={22} aria-hidden="true" /></div>
          <h2>No matching original guides</h2>
          <p>Try a broader preparation topic such as “appointment”, “timeline”, “privacy”, or “AI”. No external content is searched.</p>
        </GlassCard>
      )}
    </div>
  );
}
