# Clinora AI — Product Requirements Document

**Tagline:** Prepare for care. Not a diagnosis.  
**Document status:** Source of truth for the student final-year project  
**Owner:** [Project Owner] · **Institution:** [Institution] · **Effective date:** [Effective Date]

## 1. Product vision

Clinora AI helps adults arrive at a healthcare appointment with a clearer story and better questions. It combines a private, structured pre-visit story builder, deterministic emergency-warning routing, original educational resources, optional local-only history, and an optional server-proxied OpenRouter educational chat.

The product deliberately creates distance between preparation and clinical decision-making. It is not a medical device, emergency service, clinician, diagnostic system, treatment system, laboratory or imaging interpreter, or clinically validated service. It is not FDA-cleared, CE-certified, HIPAA-certified, or otherwise regulator-approved.

## 2. Problem statement

People can forget timing, changes, daily impact, and questions during a short appointment. Generic chatbots can blur education and diagnosis, encourage over-sharing, or hide where information goes. Clinora AI addresses the narrower preparation problem without attempting to assess disease, rank conditions, or replace professional care.

## 3. User types

- **Adult visitor preparing for care:** wants a concise story and clinician question list.
- **Adult seeking general education:** wants source-linked, plain-language preparation guidance and transparent AI limitations.
- **Student evaluator/developer:** needs inspectable safety rules, tests, documentation, and deployment instructions.
- **Under-18 visitor:** must be stopped from health-check and AI-chat data entry and directed to involve a parent/guardian and qualified clinician.

No user accounts, clinician accounts, cloud profiles, or administrative health-record views exist.

## 4. User stories

1. As an adult, I can explicitly consent to educational use before entering health concerns.
2. As a visitor, I can reach emergency guidance without consent or navigating a modal.
3. As an adult, I can describe a concern in my own words without providing identity details.
4. As an adult, I receive immediate local routing when my wording matches emergency examples.
5. As an adult, I can review and print a question list that does not diagnose or recommend treatment.
6. As an adult, I choose whether a summary is saved to this browser and can delete one or all entries.
7. As an adult, I can use general educational AI chat when the developer has configured a free OpenRouter model.
8. As a visitor without AI configuration, I see an honest unavailable state and can still complete Guided Check.
9. As a privacy-conscious user, I can inspect what stayed local, whether OpenRouter was contacted, and which original knowledge cards were used.
10. As a keyboard or screen-reader user, I can navigate every core flow with visible focus, labels, and live feedback.

## 5. Scope

### In scope

- First-use consent and 18+ confirmation, stored locally.
- Deterministic local emergency and crisis phrase routing before Guided Check submission and every AI request/response.
- Seven clearly separated Guided Check steps plus review.
- Local deterministic Clinician Question List generation, browser print/PDF, explicit IndexedDB save.
- Optional OpenRouter chat with server-only key, Zod validation, PII guards, original local retrieval, output filtering, and verified resource links.
- `/learn` original education center and individual articles.
- Explainability panels limited to non-secret operational facts.
- IndexedDB history, per-entry deletion, and comprehensive local-data deletion.
- Tide Glass dark/light/high-contrast responsive UI with persistent bottom navigation.
- Unit and browser E2E tests, documentation, legal templates, and MIT licensing.

### Non-goals and forbidden additions

- Diagnosis, disease ranking, probabilities, triage/diagnostic scores, symptom-to-disease matching.
- Prescription, dose, treatment, laboratory, pathology, imaging, or clinical-document interpretation.
- Emergency assessment or reassurance; emergency detection examples are incomplete.
- Accounts, authentication, cloud databases, EHR integration, cloud sync, advertising, analytics, trackers, payments.
- Real patient data, scraped medical text, clinical datasets, copyrighted medical encyclopedias, hospital branding.
- Ollama, local models, local/mock/demo AI providers, simulated answers, or automatic substitute answers after provider failure.

## 6. Functional requirements

### Consent and age gate
- Require an affirmative education/limitations checkbox and explicit adult status.
- Under-18 selection blocks both guided and AI flows and shows guardian/clinician guidance without collecting health details.
- Consent is revocable through Delete All Local Data.

### Safety router
- Run locally and deterministically; never delegate emergency decisions to an LLM.
- Cover chest pressure/pain, breathing problems, stroke-like signs, collapse/confusion, bleeding, severe allergic swelling, poisoning/overdose, seizures, serious injury, and self-harm/immediate danger.
- Route to `/emergency`, suppress the provider call, and expose only rule-category explanations.
- Display local emergency-service guidance, configurable local number, and US 911/988 information.

### Guided Check and summary
- Collect main concern, general topic, onset/change, plain-language severity, optional context, worries/questions, and review.
- Display privacy reminders near free text; never request identity or record identifiers.
- Keep draft health content in memory only. A reload may discard it.
- Generate questions and polite information gaps locally; preserve the user's words.
- Save only after an explicit Save action. Print through the browser.

### Ask Clinora AI
- Display “AI-generated educational guidance — not medical advice.” at all times.
- Require consent attestation and adult attestation in each request, then Zod validation.
- Run emergency and high-confidence PII checks before retrieval/provider access.
- Send only the current message and selected original retrieval context; no chat history.
- Request streaming upstream where available, buffer and validate the complete answer, then stream only validated content to the browser.
- Reject unsafe diagnostic, probability, medication-instruction, test-interpretation, invented-link, or secret-seeking output.
- Use only the deterministic safety fallback for blocked output; never simulate an answer when unavailable.
- Append resources exclusively from local metadata under “Related resources supplied to Clinora AI”.

### Local knowledge and history
- Store original summaries separately from source metadata.
- Retrieve at most three relevant cards with local keyword/BM25-style scoring.
- Treat retrieved text as untrusted data and reject instruction-like knowledge content.
- IndexedDB contains only explicitly saved entries. Settings and consent alone may use localStorage.

## 7. Non-functional requirements

- Strict TypeScript, App Router, accessible semantic HTML, responsive mobile-first UI.
- 44px minimum interactive targets, visible focus, reduced-motion support, contrast-safe light/dark themes, high-contrast opaque fallback.
- No health content in URLs, server logs, localStorage, analytics, or error messages.
- No secrets in client environment variables, browser storage, source, responses, or test fixtures.
- Core preparation features remain useful when AI is absent or offline.
- External educational links are references, not validation of generated output.

## 8. Acceptance criteria

- All required routes render independently and remain reachable on mobile and desktop.
- Check and Ask AI redirect unconsented users to `/consent`; under-18 users cannot enter either flow.
- Emergency test phrases reach `/emergency` and provider spies confirm zero provider calls.
- PII patterns block submission with editable input preserved.
- Missing key or model disables chat submit and produces the documented unavailable state.
- Safe Guided Check produces a printable Clinician Question List with no diagnosis/treatment content.
- Unsafe model output is discarded and replaced only by the approved safety boundary message.
- Saving is opt-in; single deletion and Delete All work, including consent/settings/history.
- Keyboard navigation, mobile bottom navigation, high-contrast mode, and legal route E2E checks pass.
- Lint, strict typecheck, unit tests, E2E tests, and production build complete successfully.

## 9. Success metrics

This student project uses test evidence rather than behavioral analytics:

- 100% of required routes and legal documents present.
- 100% of specified safety categories covered by deterministic unit fixtures.
- Zero provider calls in emergency and PII test cases.
- Zero health draft writes to localStorage in code inspection/tests.
- Zero runtime mock/demo/local AI providers or diagnostic modules.
- All required quality commands pass without real credentials.

No user engagement, health outcome, diagnostic accuracy, or clinical validation metric is claimed.

## 10. Safety risk register

| Risk | Impact | Mitigation | Residual limitation |
|---|---|---|---|
| Emergency wording not recognized | Delayed urgent care | Deterministic examples, prominent persistent emergency access, conservative routing | Rules are incomplete and cannot assess emergencies |
| False-positive emergency phrase | Disrupted flow | Clear explanation and immediate emergency page; no diagnosis | Conservative rules may over-route educational wording |
| Model diagnoses or gives doses | Unsafe action | Strict instructions, full-output buffering, deterministic rejection | Pattern filters cannot guarantee detection of every phrasing |
| PII sent to third party | Privacy loss | Warnings, client/server high-confidence PII block, current-message-only requests | Names and free-form identifiers are not reliably detectable |
| Prompt injection via user/retrieval | Unsafe or secret-revealing output | No tools, server-only key, bounded original cards, data/instruction separation, output checks | No prompt-injection defense is complete |
| Invented citation | Misplaced trust | Model links rejected; only local metadata links appended | Linked organizations do not validate the answer |
| Shared-device exposure | Health privacy loss | Memory-only drafts, opt-in IndexedDB, visible deletion controls | Saved browser data may be visible to other device users |
| Provider failure | Loss of chat | Honest unavailable state; Guided Check remains available | AI availability depends on developer configuration/provider |
| Consent attestation bypass | Policy circumvention | Client gate plus server boolean requirements | No identity/age verification; attestation is user-controlled |
| Local number wrong/missing | Emergency confusion | Configurable setting, US 911/988 examples, instruction to use local services | App cannot determine location or verify numbers |
