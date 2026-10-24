# Testing Strategy

## Commands

```bash
npm run lint
npm run typecheck
npm run test
npx playwright install chromium
npm run test:e2e
npm run build
```

No command requires a real OpenRouter key. Never add real credentials to CI, test fixtures, screenshots, or reports.

## Unit and integration tests (Vitest)

- Consent parsing, acceptance, under-18 gate, and consent component behavior.
- Physical emergency categories, self-harm/crisis routing, and benign text.
- Email, phone, long identifier, and street-address PII detection.
- Original knowledge retrieval limits, relevance, injection exclusion, and citation validation.
- Unsafe diagnosis/probability/dose/treatment/test-interpretation output filtering.
- Deterministic question-list generation and prohibited-language checks.
- IndexedDB explicit save/list/single-delete/clear using `fake-indexeddb` in tests only.
- Missing OpenRouter configuration and provider-call ordering with test-file spies/mocks.

## Browser E2E tests (Playwright)

- Check and Ask AI are inaccessible before adult consent.
- A safe Guided Check produces a Clinician Question List without diagnostic result language.
- Emergency phrases route directly to `/emergency`; no chat API/provider request occurs.
- Missing configuration disables chat and leaves Guided Check available.
- A configured instance connected only to a loopback test fixture returns unsafe content; the server discards it and the browser displays the approved boundary message.
- Explicit save, per-entry deletion, and Delete All for IndexedDB/consent/settings.
- Mobile bottom navigation, high-contrast opaque surfaces, legal routes, and keyboard focus/navigation.

## Test-only OpenRouter fixture

`e2e/server-harness.mjs` is test infrastructure, not application runtime code. It starts:

- Port `3210`: production app with OpenRouter variables removed.
- Port `3211`: the same production build with obvious dummy key/model and base URL pointing to port `3212`.
- Port `3212`: loopback HTTP fixture whose behavior is selected by the current request text for emergency-call counting and unsafe-output testing.

The application still has only an OpenRouter HTTP client. There is no mock/demo provider, provider selector, test mode, or fallback in `app/`, `lib/`, `components/`, or `features/`. The fixture never makes an external request. E2E runs require a production build, which the Playwright web-server command performs automatically.

## Chromium availability

Standard Playwright Chromium is preferred; install it with `npx playwright install chromium` when your network permits. If that browser is not present, `playwright.config.ts` uses the development-only npm package `@sparticuz/chromium` as a headless fallback and configures its bundled library path. This fallback is not part of the deployed application. Its wrapper is MIT licensed; bundled Chromium components retain their own licenses and notices. Set up the standard Playwright browser in CI where possible.

## Manual review still required

Automated tests cannot prove medical safety, complete emergency detection, correct AI, legal compliance, or full accessibility. Before public use, manually test current browsers, screen readers, 200–400% zoom, reduced motion, keyboard-only operation, shared-device deletion, provider terms, and deployment logs. Obtain professional clinical, legal, privacy, security, and accessibility review.

## Evidence

Actual completion results are recorded in `TRACKER.md`. Do not write “passed” before a command has run successfully in the current tree.
