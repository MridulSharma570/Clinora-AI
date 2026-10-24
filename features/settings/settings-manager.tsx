"use client";

import { Contrast, LockKeyhole, Moon, Phone, Sun, Trash2 } from "lucide-react";
import { useApp } from "@/components/layout/app-provider";
import { GlassCard, Badge } from "@/components/ui/card";
import { DeleteAllControl } from "@/features/settings/delete-all-control";

export function SettingsManager() {
  const { settings, updateSettings } = useApp();

  return (
    <div className="reading-wrap">
      <header className="page-header">
        <div>
          <p className="eyebrow">Your device, your choices</p>
          <h1 className="page-title">Privacy & display settings.</h1>
          <p className="page-description">These non-sensitive preferences stay in this browser. No account or cloud profile is created.</p>
        </div>
        <Badge><LockKeyhole size={13} aria-hidden="true" /> Stored locally</Badge>
      </header>

      <GlassCard className="settings-card">
        <section className="settings-section" aria-labelledby="appearance-title">
          <h2 id="appearance-title">Appearance & contrast</h2>
          <p>High contrast removes glass blur and transparency while preserving the same navigation and content.</p>
          <div className="settings-row">
            <div className="settings-row-label"><strong>Color theme</strong><span>Choose a contrast-safe dark or light palette.</span></div>
            <div className="segmented-control" role="group" aria-label="Color theme">
              <button type="button" aria-pressed={settings.theme === "dark"} onClick={() => updateSettings({ theme: "dark" })}><Moon size={15} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> Dark</button>
              <button type="button" aria-pressed={settings.theme === "light"} onClick={() => updateSettings({ theme: "light" })}><Sun size={15} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> Light</button>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row-label"><strong><Contrast size={16} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> High contrast</strong><span>Use opaque surfaces, stronger borders, and no decorative wash.</span></div>
            <label className="switch-control">
              <span className="sr-only">Enable high-contrast mode</span>
              <input type="checkbox" checked={settings.contrast === "high"} onChange={(event) => updateSettings({ contrast: event.target.checked ? "high" : "standard" })} />
              <span className="switch-track" aria-hidden="true" />
            </label>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="emergency-number-title">
          <h2 id="emergency-number-title">Local emergency number</h2>
          <p>Optionally store the emergency number for your current location. Clinora AI cannot verify your location or the number. In the US, use 911; the Suicide and Crisis Lifeline is 988.</p>
          <div className="field">
            <label className="form-label" htmlFor="emergency-number"><Phone size={15} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> Emergency call number <span className="optional">Optional</span></label>
            <input id="emergency-number" type="tel" inputMode="tel" className="form-input" value={settings.emergencyNumber} maxLength={24} onChange={(event) => { if (/^[0-9+()\s.-]*$/.test(event.target.value)) updateSettings({ emergencyNumber: event.target.value }); }} placeholder="For example: 911, 112, or 999" aria-describedby="emergency-number-help" />
            <p id="emergency-number-help" className="field-help">Changes save locally as you type. Do not enter a personal phone number.</p>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="storage-title">
          <h2 id="storage-title">Local data model</h2>
          <p>Consent and these settings use localStorage. Guided drafts and unsaved chats use memory only. Health summaries enter IndexedDB only after you press Save.</p>
          <div className="status-banner status-banner-info"><LockKeyhole size={20} aria-hidden="true" /><p><strong>No hidden cloud backup.</strong>There is no account, analytics, advertising, tracker, or cloud health record. Delete All cannot retract content already sent to OpenRouter.</p></div>
        </section>
      </GlassCard>

      <GlassCard className="settings-card danger-zone" style={{ marginTop: 20 }}>
        <section className="settings-section" aria-labelledby="delete-title">
          <h2 id="delete-title"><Trash2 size={19} aria-hidden="true" style={{ verticalAlign: "text-top" }} /> Delete All Local Data</h2>
          <p>Remove saved history, consent, settings, and feasible Clinora cache data on this browser. You will need to provide adult consent again before using Check or Ask AI.</p>
          <DeleteAllControl />
        </section>
      </GlassCard>
    </div>
  );
}
