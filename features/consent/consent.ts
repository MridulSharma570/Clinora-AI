import { z } from "zod";

export const CONSENT_STORAGE_KEY = "clinora.consent.v1";

export const consentStateSchema = z.strictObject({
  accepted: z.boolean(),
  adult: z.boolean(),
  acceptedAt: z.iso.datetime().optional(),
  underage: z.boolean().optional(),
});

export type ConsentState = z.infer<typeof consentStateSchema>;

export const defaultConsentState: ConsentState = {
  accepted: false,
  adult: false,
};

export function parseConsentState(value: string | null): ConsentState {
  if (!value) return defaultConsentState;
  try {
    const parsed = consentStateSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : defaultConsentState;
  } catch {
    return defaultConsentState;
  }
}

export function canUseHealthTools(state: ConsentState): boolean {
  return state.accepted && state.adult;
}

export function createAdultConsent(now: Date = new Date()): ConsentState {
  return { accepted: true, adult: true, acceptedAt: now.toISOString() };
}

export function createUnderageState(): ConsentState {
  return { accepted: false, adult: false, underage: true };
}
