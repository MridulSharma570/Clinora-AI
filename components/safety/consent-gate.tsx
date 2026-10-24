"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert, Users } from "lucide-react";
import { useApp } from "@/components/layout/app-provider";
import { canUseHealthTools } from "@/features/consent/consent";
import { GlassLink } from "@/components/ui/button";

export function UnderageBlocked() {
  return (
    <div className="reading-wrap">
      <section className="glass-card glass-card-padded" aria-labelledby="underage-title">
        <div className="icon-tile"><Users size={23} aria-hidden="true" /></div>
        <p className="eyebrow" style={{ marginTop: 22 }}>A safer next step</p>
        <h1 id="underage-title" className="section-title">Please involve a parent or guardian.</h1>
        <p className="page-description">
          Clinora AI health-check and AI-chat flows are for adults. Because you selected under 18, no health details will be collected here. Talk with a parent/guardian and a qualified clinician about your concern.
        </p>
        <div className="status-banner status-banner-warning" style={{ marginTop: 22 }}>
          <ShieldAlert size={20} aria-hidden="true" />
          <p>If you may be in immediate danger or experiencing an emergency, contact your local emergency service now. Do not wait for an online tool.</p>
        </div>
        <div className="hero-actions">
          <GlassLink href="/learn" variant="secondary">Browse general preparation resources</GlassLink>
          <GlassLink href="/emergency" variant="emergency">Emergency guidance</GlassLink>
        </div>
        <p className="small muted" style={{ marginTop: 22 }}>
          You can review your response on the <Link href="/consent" className="inline-link">consent page</Link>.
        </p>
      </section>
    </div>
  );
}

export function ConsentGate({ children }: { children: ReactNode }) {
  const { hydrated, consent } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const allowed = canUseHealthTools(consent);

  useEffect(() => {
    if (hydrated && !allowed && !consent.underage) {
      router.replace(`/consent?next=${encodeURIComponent(pathname)}`);
    }
  }, [allowed, consent.underage, hydrated, pathname, router]);

  if (!hydrated) {
    return (
      <div className="reading-wrap" role="status" aria-live="polite">
        <div className="glass-card empty-state"><p>Checking local consent choices…</p></div>
      </div>
    );
  }

  if (consent.underage) return <UnderageBlocked />;
  if (!allowed) {
    return (
      <div className="reading-wrap" role="status" aria-live="polite">
        <div className="glass-card empty-state"><p>Opening the consent and adult confirmation…</p></div>
      </div>
    );
  }

  return children;
}
