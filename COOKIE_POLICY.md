# Clinora AI — Cookie and Similar Technology Policy

**Status:** student-project template; not legal advice. Requires professional review before public deployment.

**Last updated:** [YYYY-MM-DD]  
**Operator/contact:** [Student / Institution / Project Contact]

## Plain-language summary

The Clinora AI application in this repository does not intentionally set cookies, use advertising or analytics trackers, or create a cross-site identifier. It uses browser storage only for the local features described below. A hosting provider may add its own technically necessary cookies; the operator must identify and disclose those before deployment.

## What this application uses

| Technology | Purpose | When it is used |
|---|---|---|
| `localStorage` | Remember the consent/age attestation and accessibility, emergency-number, and display preferences | After the relevant local user action |
| IndexedDB | Store only summaries or question lists the user explicitly chooses to save | After an explicit Save action |
| Cache Storage, when available | Support feasible same-origin application caching by the browser/framework | According to browser and hosting behavior |
| React memory/state | Hold the current unfinished Guided Check draft or chat view | Until refresh, navigation that resets the feature, or tab closure |

Health content is not intentionally written to `localStorage`. Explicitly saved health-related summaries are stored in IndexedDB on that browser. The application does not automatically save Guided Check history.

## Consent is not a cookie banner

The first-use consent screen records an adult/eligibility attestation and the posted educational limitations. It is not consent to advertising, analytics, or non-essential cookies. Clearing the consent record signs the browser out of that local attestation; it is not an account logout because Clinora AI has no accounts.

## AI requests

If the developer configures OpenRouter, the current chat message and selected original educational cards travel from the application server to OpenRouter. The browser does not connect directly to OpenRouter, and this application does not set an OpenRouter cookie. Consult the provider's own policy for its processing practices.

## Delete local data

Use **Settings → Delete All Local Data** or the equivalent History control to request deletion of Clinora AI's IndexedDB records, consent, settings, and feasible same-origin caches. The result depends on browser support and successful completion. A backup, browser sync copy, server/provider log, downloaded file, screenshot, or printed copy may not be removed. Browser site-data controls provide an additional deletion method.

## Hosting and future changes

Before public release, the operator must inventory actual response headers, cookies, hosting services, fonts, analytics, and third-party embeds. If any non-essential cookie or tracker is added, this policy and the consent flow must be reviewed and updated before use. Do not add advertising or health-profiling cookies to this project.

For implementation details, see `PRIVACY_POLICY.md`, `SECURITY.md`, `lib/storage/delete-all.ts`, and `/legal/cookies` in the application.
