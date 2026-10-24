import type { Metadata } from "next";
import { ArrowRight, BookOpen, Clock3, FileQuestion, LockKeyhole, MessageCircleQuestion } from "lucide-react";
import { ConsentGate } from "@/components/safety/consent-gate";
import { GlassLink } from "@/components/ui/button";
import { Badge, GlassCard } from "@/components/ui/card";

export const metadata: Metadata = { title: "Your local dashboard" };

function DashboardContent() {
  return (
    <div className="content-wrap">
      <GlassCard className="dashboard-hero">
        <div>
          <Badge>Local workspace</Badge>
          <h1>What would you like to prepare?</h1>
          <p>Your dashboard is a launchpad, not a cloud profile. No account exists, and no health dashboard data is stored on a server.</p>
        </div>
        <div className="icon-tile" style={{ width: 72, height: 72, borderRadius: 24 }}><FileQuestion size={34} aria-hidden="true" /></div>
      </GlassCard>
      <div className="dashboard-grid">
        <GlassCard className="dashboard-card">
          <div className="icon-tile"><FileQuestion size={22} aria-hidden="true" /></div>
          <h2>Start a new Guided Check</h2>
          <p>Organize a concern into your own words, a rough timeline, and questions worth bringing to a qualified clinician.</p>
          <GlassLink href="/check/concern">Begin your story <ArrowRight size={17} aria-hidden="true" /></GlassLink>
        </GlassCard>
        <GlassCard className="dashboard-card">
          <div className="icon-tile icon-tile-violet"><MessageCircleQuestion size={22} aria-hidden="true" /></div>
          <h2>Ask Clinora AI</h2>
          <p>Optional general educational chat with transparent availability and safety boundaries.</p>
          <GlassLink href="/assistant" variant="secondary">Open Ask AI</GlassLink>
        </GlassCard>
        <GlassCard className="dashboard-card">
          <div className="icon-tile"><Clock3 size={22} aria-hidden="true" /></div>
          <h2>Your saved summaries</h2>
          <p>View only what you explicitly saved to this browser. Nothing is automatically added to history.</p>
          <GlassLink href="/history" variant="secondary">Open local history</GlassLink>
        </GlassCard>
        <GlassCard className="dashboard-card">
          <div className="icon-tile"><BookOpen size={22} aria-hidden="true" /></div>
          <h2>Learn the preparation basics</h2>
          <p>Read original, short guides about timelines, privacy, question lists, and AI limitations.</p>
          <GlassLink href="/learn" variant="secondary">Browse Learn</GlassLink>
        </GlassCard>
      </div>
      <div className="status-banner status-banner-info" style={{ marginTop: 22 }}>
        <LockKeyhole size={20} aria-hidden="true" />
        <p><strong>Local by design.</strong>Consent and settings use localStorage. Health summaries use IndexedDB only after you press Save. Manage both in <a href="/settings" className="inline-link">Settings</a>.</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return <ConsentGate><DashboardContent /></ConsentGate>;
}
