import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardPenLine,
  Clock3,
  FileQuestion,
  LockKeyhole,
  MessageCircleQuestion,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import { FirstUseRedirect } from "@/components/layout/first-use-redirect";
import { GlassLink } from "@/components/ui/button";
import { Badge, GlassCard } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="content-wrap">
      <FirstUseRedirect />
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="hero-kicker-dot"><Waves size={14} aria-hidden="true" /></span>
              A calmer start to better conversations
            </div>
            <h1 id="home-title" className="hero-title">
              Prepare for care.
              <span className="accent">Not a diagnosis.</span>
            </h1>
            <p className="hero-description">
              Turn what you have noticed into a clear story and a thoughtful list of questions. Private by design, guided at your pace, with AI that stays optional.
            </p>
            <div className="hero-actions">
              <GlassLink href="/check">Start Guided Check <ArrowRight size={18} aria-hidden="true" /></GlassLink>
              <GlassLink href="/learn" variant="secondary"><BookOpen size={17} aria-hidden="true" /> Explore the basics</GlassLink>
            </div>
            <div className="trust-row" aria-label="Product privacy highlights">
              <span className="trust-item"><LockKeyhole size={15} aria-hidden="true" /> No account</span>
              <span className="trust-item"><ShieldCheck size={15} aria-hidden="true" /> Local by default</span>
              <span className="trust-item"><Sparkles size={15} aria-hidden="true" /> AI optional</span>
            </div>
          </div>

          <GlassCard className="hero-visual" aria-label="Example of an educational visit-preparation card">
            <div className="visual-topline">
              <p>YOUR VISIT, THOUGHTFULLY ORGANIZED</p>
              <Badge>Local draft</Badge>
            </div>
            <div className="tide-orb" aria-hidden="true">
              <div className="tide-ring" />
              <div className="tide-ring tide-ring-two" />
              <div className="tide-ring tide-ring-three" />
              <div className="tide-center"><FileQuestion size={32} strokeWidth={1.5} /></div>
            </div>
            <div className="preview-panel">
              <p className="preview-panel-label">A question list, not a result</p>
              <div className="preview-question"><span>1</span><span>What details about timing or change would be useful to discuss?</span></div>
              <div className="preview-question"><span>2</span><span>What should I bring or track before my visit?</span></div>
              <div className="preview-question"><span>3</span><span>What warning signs should make me seek urgent care?</span></div>
            </div>
            <p className="visual-caption"><LockKeyhole size={13} aria-hidden="true" /> Nothing is saved unless you choose Save</p>
          </GlassCard>
        </div>
      </section>

      <section className="home-section" aria-labelledby="path-title">
        <div className="section-intro">
          <p className="eyebrow">One clear path</p>
          <h2 id="path-title" className="section-heading">From “I’m not sure where to start” to ready to talk.</h2>
          <p className="section-description">No disease rankings. No treatment plans. Just a structured way to bring your own experience into the room.</p>
        </div>
        <div className="feature-grid">
          <GlassCard className="feature-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="icon-tile"><ClipboardPenLine size={22} aria-hidden="true" /></div><span className="step-number">01 / NOTICE</span>
            </div>
            <h3>Tell the story your way</h3>
            <p>Capture your main concern, rough timing, changes, and daily impact without needing medical terminology.</p>
          </GlassCard>
          <GlassCard className="feature-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="icon-tile icon-tile-violet"><FileQuestion size={22} aria-hidden="true" /></div><span className="step-number">02 / PREPARE</span>
            </div>
            <h3>Build better questions</h3>
            <p>Generate a local Clinician Question List, see what is missing, and print a concise appointment companion.</p>
          </GlassCard>
          <GlassCard className="feature-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="icon-tile"><MessageCircleQuestion size={22} aria-hidden="true" /></div><span className="step-number">03 / EXPLORE</span>
            </div>
            <h3>Learn with boundaries</h3>
            <p>Use original education cards and optional AI for general guidance, always with uncertainty and source context.</p>
          </GlassCard>
        </div>
        <div className="safety-strip">
          <ShieldCheck size={30} aria-hidden="true" />
          <div>
            <h2>Safety comes before the chatbot.</h2>
            <p>Deterministic emergency-warning rules run before any AI request. Examples are not a complete emergency assessment.</p>
          </div>
          <GlassLink href="/emergency" variant="emergency">Emergency guidance</GlassLink>
        </div>
      </section>

      <section className="home-section" aria-labelledby="local-title">
        <div className="section-intro">
          <p className="eyebrow">Your information, your choice</p>
          <h2 id="local-title" className="section-heading">Useful without becoming a health record.</h2>
        </div>
        <div className="feature-grid">
          <GlassCard className="feature-card">
            <div className="icon-tile"><LockKeyhole size={22} aria-hidden="true" /></div>
            <h3>Memory-only drafts</h3>
            <p>Your Guided Check draft stays in the current session. It is not written to localStorage or sent to a server.</p>
          </GlassCard>
          <GlassCard className="feature-card">
            <div className="icon-tile"><Clock3 size={22} aria-hidden="true" /></div>
            <h3>Save only on purpose</h3>
            <p>Choose Save to keep a summary in this browser’s IndexedDB. Delete one entry or all local data at any time.</p>
          </GlassCard>
          <GlassCard className="feature-card">
            <div className="icon-tile icon-tile-violet"><Check size={22} aria-hidden="true" /></div>
            <h3>No account required</h3>
            <p>No profiles, cloud sync, ads, analytics, or tracking. Just the tools you need and controls you can inspect.</p>
          </GlassCard>
        </div>
        <GlassCard className="home-final-cta">
          <div>
            <Badge tone="violet">A small step can make a difference</Badge>
            <h2 style={{ marginTop: 16 }}>Ready to organize your thoughts?</h2>
            <p>Start locally. Pause whenever you need. Keep the questions that matter to you.</p>
          </div>
          <GlassLink href="/check">Begin Guided Check <ArrowRight size={18} aria-hidden="true" /></GlassLink>
        </GlassCard>
        <p className="small muted" style={{ marginTop: 22 }}>
          Looking for general educational chat? <Link href="/assistant" className="inline-link">Ask Clinora AI</Link>. Availability depends on developer configuration; Guided Check works without it.
        </p>
      </section>
    </div>
  );
}
