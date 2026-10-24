import { Suspense } from "react";
import type { Metadata } from "next";
import { ConsentForm } from "@/features/consent/consent-form";

export const metadata: Metadata = { title: "Consent and adult confirmation" };

export default function ConsentPage() {
  return (
    <div className="reading-wrap">
      <header className="page-header">
        <div>
          <p className="eyebrow">Before we begin</p>
          <h1 className="page-title">A clear boundary for your care.</h1>
          <p className="page-description">
            Clinora AI helps adults prepare for conversations with clinicians. It does not provide medical advice, diagnose, prescribe, treat, interpret tests, or respond to emergencies.
          </p>
        </div>
      </header>
      <div className="status-banner status-banner-warning" role="note" style={{ marginBottom: 20 }}>
        <p><strong>Possible emergency?</strong>Contact your local emergency service or go to the nearest emergency department now. Do not wait for this app.</p>
      </div>
      <Suspense fallback={<div className="glass-card empty-state" role="status">Loading consent choices…</div>}>
        <ConsentForm />
      </Suspense>
    </div>
  );
}
