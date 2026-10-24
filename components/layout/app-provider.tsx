"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CONSENT_STORAGE_KEY, defaultConsentState, parseConsentState } from "@/features/consent/consent";
import type { ConsentState } from "@/features/consent/consent";
import { emptyGuidedCheckDraft } from "@/features/guided-check/types";
import type { GuidedCheckDraft, GuidedCheckField } from "@/features/guided-check/types";
import { SETTINGS_STORAGE_KEY, defaultSettings, parseSettings } from "@/features/settings/settings";
import type { LocalSettings } from "@/features/settings/settings";
import type { EmergencyRuleMatch } from "@/lib/safety/emergency";

interface SafetyEvent {
  matches: EmergencyRuleMatch[];
  source: "guided-check" | "chat" | "ai-output";
}

interface AppContextValue {
  hydrated: boolean;
  consent: ConsentState;
  settings: LocalSettings;
  draft: GuidedCheckDraft;
  safetyEvent: SafetyEvent | null;
  saveConsent: (state: ConsentState) => void;
  updateSettings: (patch: Partial<LocalSettings>) => void;
  updateDraft: (field: GuidedCheckField, value: string) => void;
  resetDraft: () => void;
  recordSafetyEvent: (event: SafetyEvent) => void;
  resetLocalState: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(defaultConsentState);
  const [settings, setSettings] = useState<LocalSettings>(defaultSettings);
  const [draft, setDraft] = useState<GuidedCheckDraft>(emptyGuidedCheckDraft);
  const [safetyEvent, setSafetyEvent] = useState<SafetyEvent | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setConsent(parseConsentState(localStorage.getItem(CONSENT_STORAGE_KEY)));
      setSettings(parseSettings(localStorage.getItem(SETTINGS_STORAGE_KEY)));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.contrast = settings.contrast;
  }, [settings.contrast, settings.theme]);

  const saveConsent = useCallback((state: ConsentState) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
    setConsent(state);
  }, []);

  const updateSettings = useCallback((patch: Partial<LocalSettings>) => {
    const next = { ...settings, ...patch };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next));
    setSettings(next);
  }, [settings]);

  const updateDraft = useCallback((field: GuidedCheckField, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  }, []);

  const resetDraft = useCallback(() => setDraft(emptyGuidedCheckDraft), []);
  const recordSafetyEvent = useCallback((event: SafetyEvent) => setSafetyEvent(event), []);

  const resetLocalState = useCallback(() => {
    setConsent(defaultConsentState);
    setSettings(defaultSettings);
    setDraft(emptyGuidedCheckDraft);
    setSafetyEvent(null);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      hydrated,
      consent,
      settings,
      draft,
      safetyEvent,
      saveConsent,
      updateSettings,
      updateDraft,
      resetDraft,
      recordSafetyEvent,
      resetLocalState,
    }),
    [consent, draft, hydrated, recordSafetyEvent, resetDraft, resetLocalState, safetyEvent, saveConsent, settings, updateDraft, updateSettings],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
