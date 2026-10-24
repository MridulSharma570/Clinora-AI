# Clinora AI — Engineering and Safety Rules

## Engineering rules

1. Keep TypeScript strict; validate external input and important stored-data boundaries.
2. Use App Router conventions and server components by default; isolate browser-only APIs in client modules.
3. Keep reusable UI original, composable, accessible, and consistent with Tide Glass.
4. Preserve every required route as a real page; do not collapse the product into a scrolling page.
5. Keep dependencies free/open-source and minimal. Do not add a paid service requirement.
6. Never commit `.env.local`, credentials, real health content, generated browser reports, or large test artifacts.

## AI safety rules

1. OpenRouter only. No Ollama, local model, mock/demo provider, simulated answer, or automatic provider-failure fallback.
2. Model choice is environment-driven; do not hardcode a supposedly free model.
3. Emergency routing is deterministic and occurs before provider access. Never ask an LLM to triage emergencies.
4. Repeat client safety/PII checks on the server; direct API callers are untrusted.
5. Send only current message and bounded original retrieval context after explicit user action.
6. Buffer complete output and reject diagnostic assertions, probabilities, treatment/dose instructions, lab/image interpretation, invented links, or secret disclosure before display.
7. The only blocked-output replacement is: “I can help you prepare questions for a qualified clinician, but I cannot diagnose, recommend treatment, or provide medication instructions.”
8. Never expose system instructions, hidden reasoning, chain-of-thought, internal logs, model metadata that reveals secrets, or API keys.

## Privacy rules

1. Do not request names, exact birth dates, addresses, phone numbers, emails, IDs, insurance/account numbers, or real records.
2. Health drafts stay in memory. Health content never goes into localStorage, URLs, application logs, analytics, or cloud storage.
3. IndexedDB writes require an explicit Save action. No automatic history.
4. Consent and settings are local only; Delete All removes history, consent, settings, and feasible app caches.
5. Explain third-party transfer accurately: OpenRouter receives current chat content and selected original cards only after user action.
6. Do not claim that local storage is encrypted, anonymous, HIPAA-compliant, or inaccessible to other device users.

## UI rules

1. Use “pre-visit”, “educational”, “ Clinician Question List”; never label output as diagnosis, disease checking, or triage scoring.
2. Show “AI-generated educational guidance — not medical advice.” on every chat view.
3. Emergency controls are solid coral/red; guidance is immediately visible, never modal-only.
4. Maintain 44px targets, visible focus, labels, semantic headings, live feedback, keyboard operation, and reduced motion.
5. Provide opaque fallbacks and high-contrast mode. Do not sacrifice readability for glass effects.
6. Use original abstract assets only; no hospital/clinician branding or copied illustrations.

## Security rules

1. API keys exist only in server environment configuration. Never accept keys from end users or expose them through status endpoints/errors.
2. Treat user text, retrieved text, provider responses, and stored entries as untrusted.
3. Render AI/user text as escaped plain text; do not render generated HTML or arbitrary Markdown links.
4. Keep CSP/security headers, input bounds, request timeout, and generic provider errors.
5. Do not log health prompts, responses, retrieval contents, provider error bodies, or secrets.
6. Knowledge entries are bounded and screened for instruction-like text; retrieval is not a trust boundary.
7. Test fixtures use obvious dummy values and loopback networking only inside test files.

## Documentation update rules

- Update `PRD.md` for scope, `ARCHITECTURE.md` for data/control flow, `DESIGN.md` for visual tokens/components, and `docs/API.md` for contracts.
- Record technical and safety decisions in `T_MEMORY.md`; keep `T MEMORY .md` as a pointer.
- Record only executed commands and actual outcomes in `TRACKER.md` and `docs/TESTING.md`.
- Update `docs/RESEARCH.md` only for sources actually consulted; never imply exhaustive web/GitHub research.
- Legal pages and root legal files remain student-project templates with professional-review placeholders.

## Testing rules

- Add regression fixtures for every safety-rule change, including benign false-positive candidates.
- Test that emergency and PII inputs cause zero provider calls.
- Test missing configuration and unsafe output without any real key.
- Network mocks are allowed only in test files; never add a runtime mock mode to make tests pass.
- Cover opt-in storage, single/all deletion, consent gates, keyboard/mobile navigation, contrast, legal routes, and build.
- Do not weaken assertions or skip safety tests merely to obtain a green suite.

## Forbidden scope additions

Diagnosis or disease matching; risk/probability/diagnostic scores; prescriptions, doses, treatment plans; lab/pathology/image/document interpretation; real patient data; scraped/copied medical content; accounts/cloud sync/EHR; ads/analytics/trackers/payments; Ollama/local/mock/demo AI; paid API dependencies; automatic AI-answer substitutes.
