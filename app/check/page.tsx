import type { Metadata } from "next";
import { ArrowRight, Clock3, FileQuestion, LockKeyhole, ShieldCheck } from "lucide-react";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GlassLink } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";

export const metadata: Metadata = { title: "Guided Check" };

function CheckIntroduction() {
  return (
    <div className="content-wrap">
      <header className="page-header">
        <div>
          <p className="eyebrow">Guided Check · pre-visit story builder</p>
          <h1 className="page-title">Make space for what you want to say.</h1>
          <p className="page-description">A short, structured way to organize a concern and prepare questions. It is not a disease checker, diagnosis, or triage score.</p>
        </div>
        <Badge>About 3–5 minutes</Badge>
      </header>
      <div className="feature-grid">
        <GlassCard className="feature-card"><div className="icon-tile"><Clock3 size={22} aria-hidden="true" /></div><h3>Build a rough timeline</h3><p>Use your own words for when you noticed the concern and how things have changed.</p></GlassCard>
        <GlassCard className="feature-card"><div className="icon-tile icon-tile-violet"><FileQuestion size={22} aria-hidden="true" /></div><h3>Prepare useful questions</h3><p>Finish with a local Clinician Question List and gentle reminders about missing details.</p></GlassCard>
        <GlassCard className="feature-card"><div className="icon-tile"><LockKeyhole size={22} aria-hidden="true" /></div><h3>Keep control of your data</h3><p>Your draft stays in memory. Nothing enters local history unless you explicitly press Save.</p></GlassCard>
      </div>
      <GlassCard className="glass-card-padded" style={{ marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <h2 className="section-heading">Before you start</h2>
            <p className="muted">Do not include names, contact details, IDs, account or insurance numbers, exact birth dates, or private records. You can pause or go back at any point. Reloading may clear the current draft.</p>
          </div>
          <GlassLink href="/check/concern">Start with your main concern <ArrowRight size={18} aria-hidden="true" /></GlassLink>
        </div>
      </GlassCard>
      <div className="status-banner status-banner-warning" style={{ marginTop: 20 }}>
        <ShieldCheck size={21} aria-hidden="true" />
        <p><strong>Do not use Guided Check for an emergency.</strong>If you may be experiencing an emergency, contact your local emergency service or go to the nearest emergency department now. <a href="/emergency" className="inline-link">Open emergency guidance</a>.</p>
      </div>
    </div>
  );
}

export default function CheckPage() {
  return <ConsentGate><CheckIntroduction /></ConsentGate>;
}
