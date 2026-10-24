# Contributing to Clinora AI

Thank you for improving an educational, safety-bounded student project. By contributing, you agree to the Code of Conduct and confirm you have the right to submit your work under the project's MIT License and applicable content terms.

## Before changing code

Read `RULES.md`, `PRD.md`, `ARCHITECTURE.md`, and `T_MEMORY.md`. Do not add forbidden diagnostic, treatment, lab/image, account/cloud, analytics/advertising, paid-provider, Ollama, local/mock/demo-AI, or simulated-answer features. Never include real patient information, medical records, copied medical text, or secrets in issues, fixtures, or commits.

## Development

```bash
npm install
cp .env.example .env.local
npm run dev
npm run lint
npm run typecheck
npm run test
npx playwright install chromium
npm run test:e2e
npm run build
```

AI keys are optional and developer-only. Never commit `.env.local`. Tests must pass without real credentials and without adding a runtime mock provider.

## Safety and privacy review checklist

- Emergency routing remains deterministic and before provider access.
- Emergency/PII tests assert zero provider calls.
- Complete output is checked before display; no generated HTML/citations.
- No health content enters localStorage, URLs, logs, or cloud storage.
- IndexedDB writes remain explicit; Delete All remains comprehensive.
- New free text has privacy reminders and length limits.
- Accessibility, contrast, keyboard, mobile, and reduced-motion behavior are preserved.
- Documentation and research/license registers reflect actual changes.

## Copyright and attribution

Use original code, educational summaries, and visual assets. Reference official documentation rather than copying substantial text. Identify every third-party dependency/asset and its exact license; update `THIRD_PARTY_NOTICES.md` and `docs/RESEARCH.md`. Do not contribute hospital logos, clinician photos, branded clinical content, or scraped material.

## Commits and pull requests

Keep changes focused and describe safety/test impact. Do not add automated co-author trailers or unrelated contributor identities. The repository owner reviews all changes. Legal templates are not legal advice; public/commercial use requires professional review.
