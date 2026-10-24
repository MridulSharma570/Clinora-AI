"use client";

import { AlertTriangle, HeartHandshake, LifeBuoy, Phone, ShieldAlert } from "lucide-react";
import { useApp } from "@/components/layout/app-provider";
import { GlassLink } from "@/components/ui/button";
import { GlassCard, Badge } from "@/components/ui/card";
import { ExplainabilityPanel } from "@/components/safety/explainability-panel";

const examples = [
  ["Chest or breathing", "Severe/sudden chest pressure or pain; serious trouble breathing; blue lips or inability to breathe normally."],
  ["Stroke-like signs", "One-sided weakness, face drooping, or sudden trouble speaking."],
  ["Consciousness or confusion", "Sudden fainting, collapse, severe confusion, or loss of consciousness."],
  ["Bleeding or injury", "Severe uncontrolled bleeding or a serious injury."],
  ["Allergy, poisoning, seizures", "Severe allergic reaction or face/mouth/tongue/throat swelling; suspected overdose/poisoning; active or repeated seizures."],
  ["Self-harm or immediate danger", "Suicidal or self-harm intent, or immediate danger to yourself or someone else."],
];

export function EmergencyContent() {
  const { settings, safetyEvent } = useApp();
  const telNumber = settings.emergencyNumber.replace(/[^0-9+]/g, "");

  return (
    <div className="content-wrap">
      <section className="emergency-panel" aria-labelledby="emergency-title">
        <Badge tone="neutral"><LifeBuoy size={14} aria-hidden="true" /> Immediate safety guidance</Badge>
        <h1 id="emergency-title">If you may be experiencing an emergency, contact your local emergency service or go to the nearest emergency department now.</h1>
        <p style={{ fontSize: 18 }}>Do not wait for Guided Check, an AI response, or this website. Clinora AI is not an emergency service and cannot assess whether you are safe.</p>
        <div className="emergency-actions">
          {telNumber ? (
            <a href={`tel:${telNumber}`} className="button button-emergency"><Phone size={19} aria-hidden="true" /> Call local emergency: {settings.emergencyNumber}</a>
          ) : (
            <GlassLink href="/settings" variant="emergency"><Phone size={18} aria-hidden="true" /> Set your local emergency number</GlassLink>
          )}
          <a href="tel:911" className="button button-secondary">US Emergency: 911</a>
          <a href="tel:988" className="button button-secondary"><HeartHandshake size={18} aria-hidden="true" /> US Suicide & Crisis Lifeline: 988</a>
        </div>
      </section>

      <section className="home-section" style={{ paddingTop: 44 }} aria-labelledby="warning-examples-title">
        <div className="section-intro">
          <p className="eyebrow">Examples, not an assessment</p>
          <h2 id="warning-examples-title" className="section-heading">Warning language that triggers local routing</h2>
          <p className="section-description">These examples are not a complete list. Their absence does not mean a situation is safe. If you are worried it may be an emergency, seek immediate local help.</p>
        </div>
        <div className="emergency-example-grid">
          {examples.map(([title, description]) => (
            <GlassCard className="emergency-example" key={title}><h3>{title}</h3><p>{description}</p></GlassCard>
          ))}
        </div>
      </section>

      <section className="emergency-panel" style={{ marginTop: 28 }} aria-labelledby="crisis-title">
        <ShieldAlert size={30} aria-hidden="true" />
        <h2 id="crisis-title" style={{ fontSize: 28, margin: "14px 0 10px" }}>If you may act on thoughts of harming yourself or someone else</h2>
        <p>Contact local emergency services now. In the United States, call or text 988 for the Suicide and Crisis Lifeline; call 911 for immediate danger. If you can, reach out to a trusted person nearby while seeking professional help. Do not rely on an AI chatbot in a crisis.</p>
      </section>

      <section className="home-section" style={{ paddingTop: 36 }} aria-labelledby="router-title">
        <GlassCard className="glass-card-padded">
          <div className="icon-tile"><AlertTriangle size={22} aria-hidden="true" /></div>
          <h2 id="router-title" className="section-heading" style={{ marginTop: 18 }}>Why did Clinora AI bring me here?</h2>
          <p className="muted">A deterministic local rule may have matched high-risk example wording in your current text. This routing is intentionally cautious and does not diagnose or determine the urgency of your situation.</p>
          {safetyEvent ? (
            <div className="status-banner status-banner-warning" style={{ marginTop: 18 }}>
              <AlertTriangle size={20} aria-hidden="true" />
              <p><strong>Activated rule categories</strong>{safetyEvent.matches.map((match) => match.label).join("; ")}</p>
            </div>
          ) : (
            <p className="small muted">No specific rule event is stored for this direct visit. You can open this page at any time.</p>
          )}
        </GlassCard>
        <ExplainabilityPanel
          signals={safetyEvent?.matches.map((match) => match.label) ?? []}
          safetyRule="Emergency and crisis examples route here before AI access. The LLM never decides or overrides emergency routing. The rules are examples, not a complete assessment."
          localData="Only non-secret rule-category labels may be held in memory for this explanation. Your original health text is not placed in the URL or saved by this page."
          openRouterContacted={safetyEvent?.source === "ai-output"}
          providerNote="No. Input emergency routing happens before OpenRouter. This page itself never calls AI."
        />
      </section>
    </div>
  );
}
