# Clinora AI — Canonical Agent Memory

This is the canonical persistent project memory. `T MEMORY .md` is only a compatibility pointer.

## Persistent constraints

- Clinora AI is an educational pre-visit platform for adults: **Prepare for care. Not a diagnosis.**
- Never diagnose, assign disease probabilities/scores, prescribe, dose, create treatment plans, or interpret images/labs/pathology/clinical documents.
- Never delay emergency care or claim clinical validation, medical certification, HIPAA compliance, FDA/CE clearance, or regulatory approval.
- No real patient data, scraped medical content, copyrighted medical encyclopedias, clinical datasets, or institutional visual assets.
- No accounts, authentication, cloud health profiles/databases, analytics, advertisements, trackers, payments, or EHR integration.
- No Ollama, local model, local AI fallback, mock provider, demo AI, simulated answer, or provider-failure substitute answer.
- OpenRouter is the only AI provider. Key/model are developer-configured; key remains server-side. Never ask end users for keys.

## Mandatory safety decisions

1. Deterministic local emergency/crisis router runs before guided submission and before provider access; LLMs never decide emergency status.
2. Emergency and high-confidence PII matches block provider calls. Client checks are repeated server-side.
3. Complete AI output is buffered and checked before any text is displayed. Unsafe text is discarded and replaced only with the approved safety-boundary message.
4. Provider errors produce an unavailable state, never fabricated educational content.
5. Resource links come from local source metadata only, never model-generated citations.
6. Explainability reveals rule categories, retrieval card titles, local-data behavior, and provider-contact status—not prompts, secrets, reasoning, or chain-of-thought.
7. Emergency guidance stays directly visible on `/emergency` and emergency controls remain solid coral.

## Technical decisions

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4, original shadcn-style local components, Lucide icons.
- Native fetch to OpenRouter in a Next.js route handler; Zod strict validation; upstream SSE buffered, safe answer streamed downstream as NDJSON.
- Small original JSON knowledge base with separate source metadata and local weighted keyword retrieval; no vector service.
- Guided Check drafts and chat turns live in React memory only.
- IndexedDB stores explicitly saved summaries. localStorage stores only consent and non-sensitive settings.
- Vitest + Testing Library + fake IndexedDB for units; Playwright for browser/API E2E with test-only loopback network fixtures. Standard Playwright Chromium is preferred, with a development-only npm Chromium fallback when the browser CDN is unavailable.

## Architecture choices

- Root provider owns consent/settings/draft/last safety event; no health data in route query parameters.
- Server pages for public content, focused client components for interactive flows.
- `/api/chat/status` exposes only a configured boolean, never model identifiers or configuration errors.
- Browser print provides print/PDF export without a server document service.
- Persistent fixed bottom dock across breakpoints; original Tide Glass CSS with dark/light/high-contrast variants.

## Known limitations

- Emergency phrases and PII patterns are incomplete and may produce false positives/negatives; they are not assessments.
- Adult/consent attestation is not identity or age verification.
- Output filters cannot guarantee detection of every unsafe phrasing; AI can be wrong, incomplete, or outdated.
- Local summaries are not encrypted application records and can be exposed on shared browser profiles.
- Drafts disappear on reload by design; only explicitly saved summaries persist.
- OpenRouter/model availability and provider data handling are external dependencies; review current terms before deployment.
- Delete All cannot erase data already sent to a third party or guarantee clearing platform-level logs/backups.

## Research log

Research is limited to sources actually checked and recorded in `docs/RESEARCH.md` on 2026-10-24. It covered the requested official documentation and listed technical repositories. No claim is made that the entire web or all GitHub repositories were searched. No medical article text or visual asset was copied.

## Verification snapshot

On 2026-10-24, all five required commands passed: lint, strict typecheck, 99/99 Vitest tests in 9 files, 14/14 Playwright scenarios, and the Next.js production build with 39/39 generation steps. Exact evidence is in `TRACKER.md` and `IMPLEMENTATION_REPORT.md`.

## Outstanding tasks

- Keep this file and `TRACKER.md` synchronized with actual implementation and command evidence.
- Before real public use: professional legal, clinical-safety, accessibility, privacy, and security review; provider/data-processing review; trademark search.
- Reassess emergency examples and output-filter fixtures without expanding into diagnosis or triage scoring.

## Handoff notes

Read `RULES.md`, `PRD.md`, and `ARCHITECTURE.md` before changes. Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run build`. Record only real results. Never add a co-author or automation attribution to project commits unless the owner explicitly requests it.
