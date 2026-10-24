# Medical Safety Policy

**Student-project safety template — not legal/medical advice.** Professional legal, clinical-safety, and regulatory review is required before public or commercial use.  
[Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date]

## Safety objective

Clinora AI limits itself to adult educational preparation, emergency-warning examples, and clinician question generation. It does not diagnose, prescribe, treat, dose, interpret tests/images/documents, calculate disease probability, or claim clinical validation/certification.

## Deterministic emergency routing

Local rules inspect current text before Guided Check progression and before any OpenRouter request. Categories include severe/sudden chest symptoms, serious breathing problems, stroke-like signs, collapse/confusion, uncontrolled bleeding, severe allergic swelling, overdose/poisoning, seizures, serious injury, self-harm, and immediate danger. Matches route to `/emergency`; no model makes or overrides this decision.

Emergency wording is examples only. False negatives and positives are possible. No match is not reassurance. Emergency guidance is always visible without consent and says to contact local emergency services or the nearest emergency department. US 911/988 information and a configurable local number are provided.

## AI controls

Consent/adult attestation, strict validation, emergency and PII checks, original bounded retrieval, server-only keys, complete-output filtering, and verified local citations are layered controls. Unsafe output is discarded. Provider failure yields unavailable status, not simulated content. AI may still be wrong, incomplete, or outdated; filters are not clinically validated.

## Privacy and shared devices

Drafts are memory-only. Saved summaries remain in IndexedDB only after explicit Save. No cloud accounts/records, analytics, ads, or trackers exist. OpenRouter receives current chat content and original selected cards only after user action. Local deletion cannot retract transmitted data.

## Review and incident scope

Before real deployment, qualified reviewers must assess rule fixtures, crisis language, accessibility, provider data handling, misuse, and jurisdictional duties. Do not add diagnostic accuracy claims or real patient test data. Safety changes require regression tests and updates to `PRD.md`, `RULES.md`, `TRACKER.md`, and this file.
