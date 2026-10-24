# Limited Technical Research Register

**Checked:** 2026-10-24  
**Scope statement:** Only the sources below were actually consulted through available documentation search, npm metadata, and the GitHub API. This was not a search of the entire Internet or all GitHub repositories. No medical articles, patient data, health datasets, clinical illustrations, or branded medical assets were consulted or copied.

## Official documentation and packages

| Tool/source | Official URL | License identified at research time | Version/date checked | Reason for use | Code relationship | Privacy/security relevance and restrictions |
|---|---|---|---|---|---|---|
| Next.js App Router route handlers | https://nextjs.org/docs/app/getting-started/route-handlers | Next.js package/repository: MIT | Current docs; npm `next` 16.4.3; 2026-10-24 | App pages and server proxy | Referenced only | Server-only key and bounded route-handler requests; no copied example logic |
| React reference/rules | https://react.dev/reference/react and https://react.dev/reference/rules | React package: MIT | Current docs; npm `react` 19.3.1; 2026-10-24 | Component and hooks behavior | Referenced only | Escaped React text reduces XSS risk; no generated HTML rendering |
| TypeScript `strict` | https://www.typescriptlang.org/tsconfig/strict.html | TypeScript package: Apache-2.0 | Current docs; 2026-10-24 | Strict type safety | Referenced only | Reduces implementation errors; not a runtime security boundary |
| Tailwind CSS Next.js/PostCSS guide | https://tailwindcss.com/docs/installation/using-postcss | MIT | Current docs; npm `tailwindcss` 4.3.3; 2026-10-24 | Utility CSS build pipeline | Configuration pattern referenced; original CSS authored | No runtime service/tracking; no theme copied |
| shadcn/ui introduction/components | https://ui.shadcn.com/docs and https://ui.shadcn.com/docs/components | Repository: MIT | Current docs; 2026-10-24 | Local component ownership/composition pattern | Pattern referenced only; original local equivalents | No registry code fetched; no third-party theme or remote component runtime |
| Lucide React guide/license | https://lucide.dev/guide/react/ and https://lucide.dev/license | ISC; portions derived from Feather under MIT per official license page | Current docs; npm `lucide-react` 1.61.0; 2026-10-24 | Accessible tree-shaken interface icons | Package used; no custom icon asset copied | Decorative icons hidden from AT; license notices retained |
| OpenRouter quickstart/streaming | https://openrouter.ai/docs/quickstart and https://openrouter.ai/docs/api_reference/streaming | Proprietary hosted API documentation; no code/content redistribution claimed | Current docs; 2026-10-24 | Developer-configured server-side chat | API shape referenced; original client implementation | Key server-only; current message sent after action; free-model availability and provider terms must be rechecked |
| Zod introduction/basic usage | https://zod.dev/ and https://zod.dev/basics | MIT | Current docs; npm `zod` 4.6.7; 2026-10-24 | Strict request validation | API referenced only | Bounds untrusted request shape; does not replace safety checks |
| IndexedDB API/usage (MDN) | https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API and https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB | MDN documentation licensing not relied upon for copied text; browser API is platform functionality | Current docs; 2026-10-24 | Explicit local saved history | API referenced only | Same-origin browser storage; shared-device and eviction limitations documented |
| OWASP LLM Prompt Injection Prevention | https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html | Repository: CC-BY-SA-4.0 | Current page; 2026-10-24 | Layered prompt/output defenses | Concepts referenced; no text/code copied | Untrusted retrieval, bounded context, no tools, output validation; filters not complete |
| OWASP RAG Security | https://cheatsheetseries.owasp.org/cheatsheets/RAG_Security_Cheat_Sheet.html | Repository: CC-BY-SA-4.0 | Current page; 2026-10-24 | Retrieval and logging boundaries | Concepts referenced only | Small original cards; no raw prompt/content logging |
| OWASP CSP/HTTP headers/logging | https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html and https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html and https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html | Repository: CC-BY-SA-4.0 | Current pages; 2026-10-24 | Defense-in-depth web controls | Concepts referenced only | CSP, frame restrictions, sensitive-content log avoidance |
| Vitest guide | https://vitest.dev/guide/ | MIT | Current docs; npm `vitest` 5.0.5; 2026-10-24 | Unit/integration test runner | Configuration referenced only | Test-only mocks; no secrets or real health data |
| Playwright installation/writing tests | https://playwright.dev/docs/intro and https://playwright.dev/docs/writing-tests | Apache-2.0 | Current docs; npm `@playwright/test` 1.64.1; 2026-10-24 | Browser and API E2E tests | Configuration pattern referenced only | Isolated contexts; loopback provider fixture; no real API key |

## Requested GitHub technical references

The repository metadata/license endpoint and repository URL were checked on 2026-10-24. Repository activity timestamps are not treated as package versions.

| Repository | URL | GitHub API license result | Use in Clinora AI | Copy/adapt/reference status |
|---|---|---|---|---|
| `vercel/next.js` | https://github.com/vercel/next.js | MIT | Framework reference | Referenced; package installed, no source copied |
| `vercel/ai` | https://github.com/vercel/ai | NOASSERTION from repository metadata; current npm `ai` package reports Apache-2.0 | Streaming architecture comparison only | Referenced only; package not installed or used |
| `tailwindlabs/tailwindcss` | https://github.com/tailwindlabs/tailwindcss | MIT | CSS build reference | Referenced; no source copied |
| `shadcn-ui/ui` | https://github.com/shadcn-ui/ui | MIT | Component ownership pattern | Referenced; original components, no registry code copied |
| `lucide-icons/lucide` | https://github.com/lucide-icons/lucide | NOASSERTION from repository metadata; official Lucide license page states ISC with MIT portions | Icon package reference | Package used; license page reviewed |
| `colinhacks/zod` | https://github.com/colinhacks/zod | MIT | Validation reference | Package used; no source copied |
| `OWASP/CheatSheetSeries` | https://github.com/OWASP/CheatSheetSeries | CC-BY-SA-4.0 | Security concepts | Referenced only; no text reproduced |
| `microsoft/playwright` | https://github.com/microsoft/playwright | Apache-2.0 | E2E reference | Package used; no source copied |
| `vitest-dev/vitest` | https://github.com/vitest-dev/vitest | MIT | Unit-test reference | Package used; no source copied |

## Additional package license checks

npm package metadata was checked on 2026-10-24 for planned direct dependencies. `next`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/postcss`, `zod`, `vitest`, `eslint`, `eslint-config-next`, `jsdom`, `@testing-library/react`, and `@testing-library/jest-dom` reported MIT; `lucide-react` reported ISC; `@playwright/test` and `fake-indexeddb` reported Apache-2.0; `typescript` reported Apache-2.0. After the browser CDN proved unavailable, npm metadata for the development-only `@sparticuz/chromium` 153.0.0 fallback was checked and reported MIT; its bundled Chromium components require separate notice review. Lockfile and installed package notices remain the authoritative record for the exact resolved transitive dependency set.

## Restrictions and research hygiene

- Documentation concepts and API shapes were referenced; application logic, educational summaries, Tide Glass styling, and legal-template structure were authored for Clinora AI.
- No code was copied from shadcn/ui, Next.js examples, Vercel AI, OWASP, or medical sources.
- OpenRouter is an external hosted service with its own terms; a free model is not assumed to remain free or available.
- Source organization links in the knowledge base are external reference links only. Their presence does not imply endorsement, clinical validation, or reproduction of their content.
- Dependency licenses can change between versions. Review `THIRD_PARTY_NOTICES.md`, installed license files, and legal counsel before redistribution or commercial use.
