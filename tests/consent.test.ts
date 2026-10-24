import { describe, expect, it } from "vitest";
import {
  canUseHealthTools,
  createAdultConsent,
  createUnderageState,
  defaultConsentState,
  parseConsentState,
} from "@/features/consent/consent";

describe("consent and adult gates", () => {
  it("denies health tools before explicit consent", () => {
    expect(canUseHealthTools(defaultConsentState)).toBe(false);
    expect(parseConsentState(null)).toEqual(defaultConsentState);
  });

  it("allows health tools only after adult consent", () => {
    const consent = createAdultConsent(new Date("2026-10-24T10:00:00.000Z"));
    expect(consent).toEqual({ accepted: true, adult: true, acceptedAt: "2026-10-24T10:00:00.000Z" });
    expect(canUseHealthTools(consent)).toBe(true);
    expect(parseConsentState(JSON.stringify(consent))).toEqual(consent);
  });

  it("stops under-18 users without collecting health details", () => {
    const underage = createUnderageState();
    expect(underage).toEqual({ accepted: false, adult: false, underage: true });
    expect(canUseHealthTools(underage)).toBe(false);
  });

  it.each([
    ["not json"],
    ["{}"],
    [JSON.stringify({ accepted: true, adult: true, health: "must not be here" })],
    [JSON.stringify({ accepted: "yes", adult: true })],
  ])("fails closed for malformed stored consent: %s", (stored) => {
    expect(parseConsentState(stored)).toEqual(defaultConsentState);
  });
});
