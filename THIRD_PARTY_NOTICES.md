# Third-Party Notices

**Student-project attribution template — not legal advice.**  
[Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date]

Professional legal and license review is required before public/commercial redistribution. This file is an attribution guide, not a replacement for license texts shipped by exact dependency versions.

## Direct runtime/build technology

| Project/package | License identified on 2026-10-24 | Use |
|---|---|---|
| Next.js / React / React DOM | MIT | Application framework and UI |
| Tailwind CSS / PostCSS integration | MIT | Styling build |
| Lucide React | ISC; official license also identifies MIT portions derived from Feather | Interface icons |
| Zod | MIT | Runtime validation |
| TypeScript | Apache-2.0 | Static types |
| Vitest | MIT | Unit tests |
| Playwright | Apache-2.0 | Browser tests |
| Testing Library packages / jsdom | MIT | Component/DOM tests |
| fake-indexeddb | Apache-2.0 in current npm metadata | Test-only IndexedDB implementation |
| `@sparticuz/chromium` | MIT wrapper; bundled Chromium components retain their own licenses/notices | Development-only headless browser fallback |
| ESLint and Next.js ESLint configuration | MIT | Static linting |

See `docs/RESEARCH.md` for exact official URLs and research scope. `vercel/ai` was reviewed as a technical reference only and is not installed or used.

## Attribution instructions for redistributors

1. Retain this file, the project `LICENSE`, and all required third-party copyright/license notices.
2. Inspect `package.json`, `package-lock.json`, and installed `node_modules/*/LICENSE*` for the exact resolved direct and transitive dependency set.
3. Preserve ISC/MIT/Apache-2.0 notices and any Apache license/NOTICE requirements where applicable.
4. Recheck licenses after dependency updates; do not assume a later version retains the same terms.
5. Do not remove Lucide/Feather notices when redistributing applicable icon code or assets.
6. External linked organizations are not dependencies and do not endorse Clinora AI. Their names/content are not granted under this project's MIT license.

No medical article text, clinical dataset, real health record, hospital logo, or copyrighted medical illustration is included under this notice.

Clinora AI is educational, not medical advice; it does not diagnose, prescribe, treat, dose, or interpret tests. AI output may be incorrect, incomplete, or outdated. Contact local emergency services in an emergency. Health summaries remain local only after explicit Save. There are no cloud accounts/records, analytics, ads, or trackers. OpenRouter receives current chat content and selected original cards only after user action; OpenRouter and model providers have separate terms not granted here.
