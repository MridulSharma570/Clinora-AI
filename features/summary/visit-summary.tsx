"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, FileQuestion, Info, ListChecks, LockKeyhole, Printer, RotateCcw, Save, ShieldCheck } from "lucide-react";
import { useApp } from "@/components/layout/app-provider";
import { Button, GlassLink } from "@/components/ui/button";
import { Badge, GlassCard } from "@/components/ui/card";
import { ExplainabilityPanel } from "@/components/safety/explainability-panel";
import { generateVisitSummary } from "@/features/summary/generate-summary";
import { createHistoryEntry, saveHistoryEntry } from "@/lib/storage/history";
import { assessEmergency } from "@/lib/safety/emergency";

export function VisitSummaryView() {
  const { draft, resetDraft, recordSafetyEvent } = useApp();
  const [createdAt] = useState(() => new Date());
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();
  const summary = useMemo(() => generateVisitSummary(draft, createdAt), [createdAt, draft]);
  const emergency = useMemo(() => assessEmergency(Object.values(draft).join(" ")), [draft]);

  useEffect(() => {
    if (emergency.shouldRoute) {
      recordSafetyEvent({ matches: emergency.matches, source: "guided-check" });
      router.replace("/emergency");
    }
  }, [emergency.matches, emergency.shouldRoute, recordSafetyEvent, router]);

  if (emergency.shouldRoute) {
    return <div className="reading-wrap" role="status"><GlassCard className="empty-state"><p>Opening emergency guidance…</p></GlassCard></div>;
  }

  if (!draft.concern.trim()) {
    return (
      <div className="reading-wrap">
        <GlassCard className="empty-state">
          <div className="icon-tile"><FileQuestion size={23} aria-hidden="true" /></div>
          <h1 className="section-heading">No current visit-prep draft</h1>
          <p>For privacy, unsaved drafts stay in memory and can disappear on reload. Start a new Guided Check to create a local question list.</p>
          <GlassLink href="/check/concern">Start Guided Check</GlassLink>
        </GlassCard>
      </div>
    );
  }

  const save = async () => {
    setSaveState("saving");
    setSaveMessage("");
    try {
      await saveHistoryEntry(createHistoryEntry(summary));
      setSaveState("saved");
      setSaveMessage("Saved to this browser’s local history. No server or cloud copy was created.");
    } catch {
      setSaveState("error");
      setSaveMessage("This browser could not save the summary. You can still print or save it as a PDF.");
    }
  };

  const startNew = () => {
    resetDraft();
    router.push("/check/concern");
  };

  return (
    <div className="reading-wrap">
      <header className="page-header no-print">
        <div>
          <p className="eyebrow">Your visit-preparation summary</p>
          <h1 className="page-title">A clearer conversation starts here.</h1>
          <p className="page-description">This is an educational Clinician Question List—not a diagnosis, disease ranking, treatment plan, or medication recommendation.</p>
        </div>
      </header>

      <div className="summary-actions no-print">
        <Button onClick={() => window.print()} variant="secondary"><Printer size={17} aria-hidden="true" /> Print / save PDF</Button>
        <Button onClick={save} disabled={saveState === "saving" || saveState === "saved"}><Save size={17} aria-hidden="true" />{saveState === "saved" ? "Saved locally" : saveState === "saving" ? "Saving…" : "Save to this device"}</Button>
        <Button onClick={startNew} variant="ghost"><RotateCcw size={17} aria-hidden="true" /> Start new</Button>
      </div>
      <div className="no-print" aria-live="polite">
        {saveMessage && <div className={`status-banner ${saveState === "error" ? "status-banner-warning" : "status-banner-info"}`} style={{ marginBottom: 18 }}><Check size={19} aria-hidden="true" /><p>{saveMessage}</p></div>}
      </div>

      <GlassCard className="summary-sheet">
        <div className="summary-sheet-header">
          <div>
            <Badge>Clinician Question List</Badge>
            <h2>{summary.title}</h2>
          </div>
          <FileQuestion size={32} className="text-sea" aria-hidden="true" />
        </div>

        <section className="summary-section" aria-labelledby="story-title">
          <h3 id="story-title"><ListChecks size={19} aria-hidden="true" /> My story, in my words</h3>
          <dl className="review-list">
            {summary.storyRows.map((row) => <div className="review-row" key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}
          </dl>
        </section>

        <section className="summary-section" aria-labelledby="questions-title">
          <h3 id="questions-title"><FileQuestion size={19} aria-hidden="true" /> Questions to consider asking</h3>
          <ul className="question-list">
            {summary.questions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        </section>

        <section className="summary-section" aria-labelledby="gaps-title">
          <h3 id="gaps-title"><Info size={19} aria-hidden="true" /> Information gaps to consider</h3>
          {summary.gaps.length ? <ul className="gap-list">{summary.gaps.map((gap) => <li key={gap}>{gap}</li>)}</ul> : <p className="muted">No required information gaps were identified. You can still add anything that feels important.</p>}
        </section>

        <section className="summary-section" aria-labelledby="prepare-title">
          <h3 id="prepare-title"><ShieldCheck size={19} aria-hidden="true" /> What to bring or track</h3>
          <ul className="gap-list">{summary.preparationPoints.map((point) => <li key={point}>{point}</li>)}</ul>
        </section>

        <div className="status-banner status-banner-warning" style={{ marginTop: 30 }}>
          <ShieldCheck size={20} aria-hidden="true" />
          <p><strong>Ask which warning signs apply to you.</strong>If you may be experiencing an emergency, contact your local emergency service or go to the nearest emergency department now. This summary is not an emergency assessment.</p>
        </div>
      </GlassCard>

      <p className="small muted no-print" style={{ marginTop: 16 }}><LockKeyhole size={14} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> Generated locally without AI. Printing uses your browser; saving history happens only when you press Save.</p>
      <div className="no-print">
        <ExplainabilityPanel
          safetyRule="The full current draft passed the local emergency phrase scan before this summary was shown. No match does not rule out an emergency."
          localData="The summary is generated in this browser. It remains in memory unless you explicitly press Save; then only the summary enters IndexedDB. Printing is handled by your browser."
          openRouterContacted={false}
        />
      </div>
    </div>
  );
}
