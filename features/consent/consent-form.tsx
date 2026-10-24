"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, LockKeyhole, ShieldCheck, Users } from "lucide-react";
import { useApp } from "@/components/layout/app-provider";
import { Button, GlassLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { createAdultConsent, createUnderageState } from "@/features/consent/consent";

function safeNextPath(value: string | null): string {
  if (!value) return "/dashboard";
  const allowed = ["/dashboard", "/check", "/assistant", "/summary", "/history"];
  if (allowed.includes(value) || /^\/check\/[a-z-]+$/.test(value)) return value;
  return "/dashboard";
}

export function ConsentForm() {
  const { consent, saveConsent, resetDraft } = useApp();
  const [accepted, setAccepted] = useState(false);
  const [age, setAge] = useState<"adult" | "under18" | "">("");
  const [error, setError] = useState("");
  const [reviewUnderage, setReviewUnderage] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (consent.underage && !reviewUnderage) {
    return (
      <GlassCard className="glass-card-padded">
        <div className="icon-tile"><Users size={23} aria-hidden="true" /></div>
        <h2 className="section-heading" style={{ marginTop: 20 }}>Health details are paused.</h2>
        <p className="muted">
          You selected that you are under 18. Clinora AI will not collect health-check or AI-chat details. Please involve a parent/guardian and a qualified clinician.
        </p>
        <div className="hero-actions">
          <GlassLink href="/learn" variant="secondary">General education only</GlassLink>
          <Button variant="ghost" onClick={() => setReviewUnderage(true)}>Review my response</Button>
        </div>
      </GlassCard>
    );
  }

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!age) {
      setError("Please confirm whether you are 18 or older.");
      return;
    }
    if (age === "under18") {
      saveConsent(createUnderageState());
      resetDraft();
      setReviewUnderage(false);
      return;
    }
    if (!accepted) {
      setError("Please select the educational-use consent checkbox.");
      return;
    }

    saveConsent(createAdultConsent());
    resetDraft();
    router.push(safeNextPath(searchParams.get("next")));
  };

  return (
    <GlassCard className="glass-card-padded">
      {consent.accepted && consent.adult && (
        <div className="status-banner status-banner-info" role="status" style={{ marginBottom: 22 }}>
          <Check size={20} aria-hidden="true" />
          <p><strong>Adult consent is saved on this device.</strong>You can review it below or continue to your dashboard.</p>
        </div>
      )}
      <form onSubmit={submit} noValidate>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="form-label" style={{ marginBottom: 12 }}>1. Confirm your age</legend>
          <div className="choice-grid">
            <label className="choice-card">
              <input type="radio" name="age" value="adult" checked={age === "adult"} onChange={() => setAge("adult")} />
              <span>I am 18 or older</span>
            </label>
            <label className="choice-card">
              <input type="radio" name="age" value="under18" checked={age === "under18"} onChange={() => setAge("under18")} />
              <span>I am under 18</span>
            </label>
          </div>
        </fieldset>

        <fieldset style={{ border: 0, padding: 0, margin: "26px 0 0" }}>
          <legend className="form-label" style={{ marginBottom: 12 }}>2. Consent to educational use</legend>
          <label className="choice-card checkbox-row">
            <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
            <span>I understand Clinora AI provides educational preparation only—not medical advice, diagnosis, treatment, or emergency care—and I choose to continue.</span>
          </label>
        </fieldset>

        {error && <p className="error-text" role="alert" style={{ marginTop: 14 }}>{error}</p>}

        <div className="privacy-reminder">
          <LockKeyhole size={19} aria-hidden="true" />
          <p><strong>Local consent only.</strong> This choice is stored in this browser. No account is created. Do not enter health details on this page.</p>
        </div>

        <Button type="submit" className="button-wide">
          {age === "under18" ? "Confirm age response" : "Accept and continue"}<ArrowRight size={18} aria-hidden="true" />
        </Button>
      </form>
      <p className="small muted" style={{ marginTop: 18 }}>
        Read the <Link href="/legal/privacy" className="inline-link">privacy notice</Link>, <Link href="/legal/disclaimer" className="inline-link">medical disclaimer</Link>, and <Link href="/legal/terms" className="inline-link">terms</Link>. You can remove consent with Delete All Local Data.
      </p>
      <p className="small muted"><ShieldCheck size={15} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> AI chat remains optional and is never required for Guided Check.</p>
    </GlassCard>
  );
}
