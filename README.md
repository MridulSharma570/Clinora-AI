# CLINORA AI

## Prepare for care. Not a diagnosis.

Clinora AI is a multi-page, educational pre-visit health-guidance platform for adults. It helps organize a health concern, recognize example emergency warning language, prepare questions for licensed clinicians, learn from original source-linked resources, and optionally use a safety-guarded OpenRouter educational chat.

> **Important:** Clinora AI is not a medical device, doctor, emergency service, diagnostic/treatment system, lab or imaging interpreter, or clinically validated product. It is not FDA-cleared, CE-certified, HIPAA-certified, or regulator-approved. AI output can be wrong, incomplete, or outdated. If you may be experiencing an emergency, contact your local emergency service or go to the nearest emergency department now.

## What is included

- First-use educational consent and explicit 18+ gate.
- Deterministic local emergency/crisis routing before AI access.
- Seven-step Guided Check with review and privacy reminders.
- Local Clinician Question List with information gaps and browser print/PDF.
- Explicit-save IndexedDB history, per-entry deletion, and Delete All Local Data.
- Original local knowledge center with separate, verified source metadata.
- Optional “Ask Clinora AI” streaming interface using a server-only OpenRouter key.
- Client/server PII checks, complete-output safety filtering, and local-only citations.
- Explainability panels without prompts, secrets, or hidden reasoning.
- Original Tide Glass dark/light/high-contrast design and persistent bottom navigation.
- Full student-project legal templates, architecture documentation, and tests.

**Not included:** accounts, cloud health records, analytics, advertising, trackers, payments, EHR integration, diagnosis, disease probabilities, prescriptions, doses, treatment plans, lab/image interpretation, Ollama, local models, mock/demo AI, or simulated provider-failure answers.

## Quick start

### Requirements

- Node.js 22.12 or newer
- npm
- Optional: a developer-owned OpenRouter API key and a currently available free model

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Next.js. The app works without an OpenRouter key: Guided Check, summaries, learning resources, printing, and local history remain available; Ask AI displays an honest unavailable state.

## OpenRouter setup (optional)

Edit `.env.local`—never commit it:

```dotenv
OPENROUTER_API_KEY=your_developer_owned_key
OPENROUTER_MODEL=exact_model_identifier_from_openrouter
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
NEXT_PUBLIC_APP_NAME=Clinora AI
NEXT_PUBLIC_DEFAULT_EMERGENCY_NUMBER=
NEXT_TELEMETRY_DISABLED=1
```

1. Sign in to OpenRouter as the project developer and review its current terms/privacy/model data policies.
2. Open OpenRouter's official model catalog and filter for models currently labeled **free**. Availability, pricing, rate limits, and data policies can change.
3. Copy the exact current model identifier into `OPENROUTER_MODEL`. This repository intentionally does not hardcode a model identifier.
4. Create a development key with the smallest practical permissions/limits and put it only in `.env.local` or deployment server environment variables.
5. Restart the development server. `/api/chat/status` returns only whether chat is configured.

Never put the key in `NEXT_PUBLIC_*`, browser storage, source, test files, screenshots, logs, or commits. End users are never asked to paste a key. If either key or model is missing, chat stays disabled. Provider failure never triggers a local/mock answer.

## Quality commands

```bash
npm run lint
npm run typecheck
npm run test
npx playwright install chromium  # once, for browser tests
npm run test:e2e
npm run build
```

`test:e2e` builds the app and launches two loopback production instances: one without AI configuration and one connected to a test-only loopback provider fixture. No external AI request or real key is used. Standard Playwright Chromium is preferred; if it is not installed, the development-only `@sparticuz/chromium` npm package provides a headless fallback. See `docs/TESTING.md` and `TRACKER.md` for actual evidence.

## Project map

```text
app/                    App Router pages and guarded API route handlers
components/             Original Tide Glass, layout, safety, chat, check UI
features/               Consent, guided flow, chat, history, settings logic
lib/                    Safety, retrieval, storage, validation, AI utilities
data/knowledge/         Original summaries + separate source metadata
content/                Legal page content and shared copy
public/                 Original static assets
tests/                  Vitest unit/integration tests
e2e/                    Playwright tests and test-only server harness
docs/                   Research, API, deployment, testing documentation
```

## Privacy and data behavior

- Guided drafts and unsaved chat are held in memory and disappear on reload.
- Health content is never placed in localStorage or route query strings.
- Only explicit Save writes a summary to IndexedDB on the current browser/origin.
- localStorage contains consent and non-sensitive UI/emergency-number settings only.
- No server history, cloud account, sync, analytics, advertising, or tracker exists.
- After the user presses send and checks pass, OpenRouter receives the current chat message and selected original knowledge cards. Prior turns, Guided Check drafts, and saved history are not sent.
- Delete All clears local history, consent, settings, and feasible app caches. It cannot revoke data already sent to a third party or erase platform logs/backups.
- Local browser data is not an encrypted medical record and may be visible on shared devices.

## Safety limitations

Emergency and PII detection use incomplete deterministic patterns and may miss or over-match wording. The emergency page is not an assessment. Output filters reduce risk but cannot guarantee safe or correct AI. Source links do not validate AI output. Consent is an attestation, not age verification. A qualified clinician must make clinical decisions.

## Documentation and legal

Start with `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md`, `RULES.md`, `T_MEMORY.md`, and `docs/RESEARCH.md`. See `COOKIE_POLICY.md`, `AI_ETHICS.md`, and `IMPLEMENTATION_REPORT.md` for storage, responsible-AI, and final verification details. Legal documents are student-project templates, not legal advice; professional legal, clinical-safety, privacy, security, accessibility, and trademark review is required before public or commercial use.

Original project code is MIT licensed. “Clinora AI” is not claimed as a registered trademark; a real trademark search is required before public launch.
