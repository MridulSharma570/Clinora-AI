import type { Metadata } from "next";
import { ArrowRight, Bot, Check, FileQuestion, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { GlassLink } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";

export const metadata: Metadata = { title: "About Clinora AI" };

export default function AboutPage() {
  return (
    <div className="content-wrap">
      <header className="page-header"><div><p className="eyebrow">A deliberately narrow project</p><h1 className="page-title">Preparation, with boundaries built in.</h1><p className="page-description">Clinora AI is a college final-year student project exploring safer educational health-visit preparation for adults. It is not a clinical product or a replacement for professional care.</p></div><Badge>Educational student project</Badge></header>

      <div className="dashboard-grid">
        <GlassCard className="dashboard-card">
          <div className="icon-tile"><Check size={22} aria-hidden="true" /></div>
          <h2>What Clinora AI is</h2>
          <ul className="gap-list"><li>A structured way to describe a concern in your own words.</li><li>A local Clinician Question List and appointment-preparation aid.</li><li>A deterministic emergency-warning router with direct safety guidance.</li><li>An original educational library and optional guarded OpenRouter chat.</li><li>A local-first privacy design with explicit-save history.</li></ul>
        </GlassCard>
        <GlassCard className="dashboard-card">
          <div className="icon-tile icon-tile-violet"><X size={22} aria-hidden="true" /></div>
          <h2>What Clinora AI is not</h2>
          <ul className="gap-list"><li>Not a doctor, medical device, emergency service, or clinician–patient relationship.</li><li>Not diagnosis, disease ranking, clinical probability, triage scoring, or treatment.</li><li>Not a prescription, dosing, laboratory, pathology, imaging, or document interpreter.</li><li>Not clinically validated, FDA-cleared, CE-certified, HIPAA-certified, or regulator-approved.</li><li>Not an account, cloud health record, EHR, advertising, or analytics platform.</li></ul>
        </GlassCard>
      </div>

      <section className="home-section" aria-labelledby="how-title">
        <div className="section-intro"><p className="eyebrow">Safety by architecture</p><h2 id="how-title" className="section-heading">The chatbot is never the first line of decision-making.</h2><p className="section-description">Important boundaries live in deterministic application code, not just in a model instruction.</p></div>
        <div className="feature-grid">
          <GlassCard className="feature-card"><div className="icon-tile"><ShieldCheck size={22} aria-hidden="true" /></div><h3>Local rules run first</h3><p>Emergency and high-confidence PII checks run before provider access. Emergency matches route away without calling OpenRouter.</p></GlassCard>
          <GlassCard className="feature-card"><div className="icon-tile"><Bot size={22} aria-hidden="true" /></div><h3>Output is checked whole</h3><p>Provider text is collected and validated before any of it reaches the page. Unsafe text is discarded; provider failures get no fake answer.</p></GlassCard>
          <GlassCard className="feature-card"><div className="icon-tile"><LockKeyhole size={22} aria-hidden="true" /></div><h3>Less data by default</h3><p>No prior turns, guided drafts, or saved history are sent. Only the current message and selected original cards leave after Send.</p></GlassCard>
        </div>
      </section>

      <GlassCard className="home-final-cta">
        <div><Badge tone="violet"><FileQuestion size={13} aria-hidden="true" /> Useful without AI</Badge><h2 style={{ marginTop: 16 }}>Start with your own story.</h2><p>Guided Check and question-list generation work locally without an OpenRouter key.</p></div>
        <GlassLink href="/check">Open Guided Check <ArrowRight size={18} aria-hidden="true" /></GlassLink>
      </GlassCard>
      <p className="small muted" style={{ marginTop: 22 }}>AI output may be incorrect, incomplete, or outdated. If you may be experiencing an emergency, contact your local emergency service or go to the nearest emergency department now.</p>
    </div>
  );
}
