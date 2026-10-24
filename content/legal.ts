export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocumentData {
  slug: string;
  title: string;
  description: string;
  sections: LegalSection[];
}

export const legalDocuments: Record<string, LegalDocumentData> = {
  terms: {
    slug: "terms",
    title: "Terms of Use",
    description: "The boundaries for using this adult educational student project.",
    sections: [
      { heading: "Acceptance and adult use", paragraphs: ["By continuing after the consent notice, you confirm that you understand Clinora AI’s educational scope and are 18 or older. If you are under 18, do not enter health details; involve a parent or guardian and a qualified clinician. This attestation is not identity or age verification."] },
      { heading: "Educational scope", paragraphs: ["Clinora AI helps organize pre-visit stories and questions. It is not medical advice, a doctor, medical device, emergency service, diagnostic system, or clinically validated service. No clinician–patient relationship is created."], bullets: ["No diagnosis, disease ranking, probability, or diagnostic score.", "No prescriptions, doses, medication start/stop instructions, or treatment plans.", "No laboratory, pathology, imaging, or clinical-document interpretation.", "No clinical accuracy, HIPAA, FDA, CE, or regulatory certification claim."] },
      { heading: "Emergencies and professional care", paragraphs: ["If you may be experiencing an emergency, contact your local emergency service or go to the nearest emergency department now. In the United States, call 911 for emergencies and call or text 988 for the Suicide and Crisis Lifeline. Never delay professional or emergency care because of this app. Warning-sign examples are incomplete."] },
      { heading: "Acceptable use", paragraphs: ["Do not submit another person’s information, real patient records, identity or account details, unlawful content, or attempts to extract prompts and secrets. Do not use Clinora AI to impersonate a clinician, diagnose, prescribe, interpret tests, disrupt the service, or misrepresent its status."] },
      { heading: "Local data and OpenRouter", paragraphs: ["Guided drafts are memory-only. Health summaries enter browser IndexedDB only after explicit Save. Clinora AI has no cloud accounts or health records, analytics, advertising, or trackers. After you press Send and checks pass, OpenRouter receives the current message and selected original knowledge cards. Provider terms apply separately; local deletion cannot retract transmitted data."] },
      { heading: "Availability and template terms", paragraphs: ["AI may be unconfigured, unavailable, rate-limited, or withdrawn. No substitute answer is fabricated. The software is provided as is under the MIT License to the extent permitted by applicable law. [Project Owner] must obtain jurisdiction-specific review of warranty, liability, consumer, health, privacy, and minor-protection terms before deployment."] },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description: "What stays in your browser, what leaves after Send, and what deletion can—and cannot—do.",
    sections: [
      { heading: "Information handled", bullets: ["Consent/adult attestation, theme, contrast, and optional emergency number in localStorage.", "Guided Check drafts and unsaved chat in memory only.", "Explicitly saved summaries in origin-bound IndexedDB.", "The current chat message and selected original knowledge cards sent to OpenRouter only after user action and safety checks."] },
      { heading: "What is not implemented", paragraphs: ["Clinora AI has no accounts, authentication, cloud patient profiles, cloud health records, cloud sync, EHR integration, advertisements, analytics, cross-site trackers, payments, or sale of personal information. It does not include real patient data or clinical datasets."] },
      { heading: "Free-text precautions", paragraphs: ["Do not enter names, emails, phone numbers, addresses, IDs, account or insurance numbers, exact birth dates, private records, or other people’s information. High-confidence patterns are blocked, but free-form PII detection is incomplete. Do not use chat with details you do not want transferred."] },
      { heading: "Local storage and shared devices", paragraphs: ["Browser storage is not represented as encrypted, anonymous, or inaccessible to other users of the same browser profile. Browser eviction, extensions, malware, device access, and backups are outside the app’s control. Reloading may clear unsaved drafts."] },
      { heading: "Deletion limits", paragraphs: ["Delete one summary or use Delete All Local Data to remove local history, consent, settings, and feasible Clinora caches. This cannot retract content already sent to OpenRouter or erase provider, hosting, device, or backup records. Those require separate review and action."] },
      { heading: "Operator placeholders", paragraphs: ["Operator/controller: [Project Owner], [Institution]. Jurisdiction: [Country/Jurisdiction]. Effective date: [Effective Date]. Actual hosting metadata, retention, rights procedures, and contact details must be completed after professional review. No HIPAA compliance is claimed."] },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Medical Disclaimer",
    description: "Prepare for care. Not a diagnosis.",
    sections: [
      { heading: "Educational preparation only", paragraphs: ["Clinora AI provides general educational pre-visit preparation for adults. It is not a doctor, licensed clinician, medical device, emergency service, diagnostic or treatment system, laboratory or imaging interpreter, or clinically validated product. No clinician–patient relationship is formed."] },
      { heading: "No individual clinical conclusions", paragraphs: ["Clinora AI does not state what condition a person has, assign disease probabilities or diagnostic scores, prescribe, dose, start or stop medicines, create treatment plans, or interpret X-rays, MRI/CT images, pathology, laboratory values, or clinical documents."] },
      { heading: "Uncertainty and qualified advice", paragraphs: ["Local and AI-generated information may be incorrect, incomplete, or outdated. General information may not apply to an individual. Related source links do not validate AI output. Only a qualified clinician who can appropriately assess you can provide individualized medical advice."] },
      { heading: "Emergency warning", paragraphs: ["Never disregard, delay, or change professional care because of Clinora AI. If you may be experiencing an emergency, contact your local emergency service or go to the nearest emergency department now. In the US: Emergency 911; Suicide and Crisis Lifeline 988. Warning signs are examples, not a complete assessment."] },
      { heading: "Regulatory status", paragraphs: ["Clinora AI is not FDA-cleared, CE-certified, HIPAA-certified, or otherwise regulator-approved. No clinical accuracy, clinical validation, or medical certification is claimed."] },
    ],
  },
  "medical-safety": {
    slug: "medical-safety",
    title: "Medical Safety",
    description: "How deterministic routing and layered AI boundaries support a deliberately narrow product scope.",
    sections: [
      { heading: "Safety objective", paragraphs: ["Clinora AI is limited to adult educational preparation, emergency-warning examples, and clinician question generation. It does not diagnose, prescribe, treat, dose, interpret tests, calculate disease probability, or claim validation or certification."] },
      { heading: "Deterministic emergency routing", paragraphs: ["Local rules inspect current text before Guided Check progression and before any OpenRouter request. Categories include chest/breathing warnings, stroke-like signs, collapse/confusion, bleeding, allergic swelling, overdose/poisoning, seizures, serious injury, self-harm, and immediate danger. A match routes directly to emergency guidance; a model cannot override it."] },
      { heading: "Limits of warning examples", paragraphs: ["Rules can miss emergencies or over-route benign wording. No match is not reassurance and the system is not a triage score. Emergency guidance is always available without consent and tells users to contact local emergency services. US 911 and 988 information and a configurable local number are shown."] },
      { heading: "AI controls", paragraphs: ["Adult/consent attestation, strict validation, emergency and PII checks, bounded original retrieval, server-only keys, complete-output filtering, and verified local citations are layered controls. Unsafe output is discarded. Provider failure yields an unavailable state, never simulated content."] },
      { heading: "Required review", paragraphs: ["Automated tests cannot prove medical safety. Before real deployment, qualified professionals must review rule fixtures, crisis language, accessibility, provider data handling, misuse, and jurisdictional duties in [Country/Jurisdiction]. Safety changes require regression tests and documentation updates."] },
    ],
  },
  copyright: {
    slug: "copyright",
    title: "Copyright & Trademark",
    description: "Original project material, third-party ownership, and the limits of the Clinora AI name.",
    sections: [
      { heading: "Original material", paragraphs: ["Original Clinora AI source code is MIT licensed unless a file states otherwise. Tide Glass styling, the abstract tide mark, interface copy, knowledge summaries, and documentation were authored for this project. No scraped medical articles, real health records, clinical datasets, hospital logos, doctor photos, or branded clinical illustrations are intentionally reproduced."] },
      { heading: "Third-party rights", paragraphs: ["Next.js, React, Tailwind CSS, Lucide, Zod, Playwright, Vitest, and other dependencies remain the property of their respective owners and retain their licenses. External organization names and URLs are reference links, not endorsements or permission to copy their content."] },
      { heading: "Trademark notice", paragraphs: ["“Clinora AI” is not claimed as a registered trademark. No assertion of exclusive rights, affiliation, endorsement, or sponsorship is made. A real trademark clearance search and professional legal review are required before public launch or commercial use in [Country/Jurisdiction] and every intended market."] },
      { heading: "Attribution and concerns", paragraphs: ["Retain required project and dependency notices when redistributing. Contributors must submit only material they have the right to license. Report a good-faith copyright concern to [Project Owner] at [Institution] without including health or private record information. This template does not establish a statutory takedown procedure."] },
    ],
  },
  licenses: {
    slug: "licenses",
    title: "Open-Source Licenses",
    description: "Direct technology acknowledgments and instructions for exact-version attribution.",
    sections: [
      { heading: "Licenses identified on 2026-10-24", bullets: ["Next.js, React, React DOM, Tailwind CSS, Zod, Vitest, ESLint, Testing Library, and jsdom: MIT.", "Lucide React: ISC, with official license notes identifying MIT portions derived from Feather.", "TypeScript, Playwright, and the current fake-indexeddb package: Apache-2.0.", "The development-only @sparticuz/chromium wrapper: MIT; bundled Chromium components retain separate licenses and notices.", "Original Clinora AI code: MIT."] },
      { heading: "Research boundary", paragraphs: ["Only the official documentation and listed technical repositories recorded in docs/RESEARCH.md were reviewed. The entire Internet and all GitHub repositories were not searched. Vercel AI was referenced architecturally but is not installed or used."] },
      { heading: "Redistribution instructions", bullets: ["Retain LICENSE, NOTICE.md, THIRD_PARTY_NOTICES.md, and applicable dependency notices.", "Inspect package.json, package-lock.json, and installed dependency license files for exact resolved versions.", "Recheck licenses after updates and preserve Apache/ISC/MIT requirements where applicable.", "Obtain professional legal review before public or commercial redistribution."] },
      { heading: "External services", paragraphs: ["OpenRouter and downstream model providers have separate terms; no rights to those services are granted by this project. A free model’s pricing and availability can change. No paid API dependency or hardcoded model fallback is included."] },
    ],
  },
  security: {
    slug: "security",
    title: "Security",
    description: "Defense-in-depth choices, deployment responsibilities, and private reporting expectations.",
    sections: [
      { heading: "Application boundaries", bullets: ["OpenRouter key and model configuration remain server-side; status exposes only a boolean.", "Strict schemas, bounded inputs, emergency/PII checks, timeouts, generic errors, and no application health-content logging.", "Original retrieval is bounded and untrusted; the model has no tools or privileged actions.", "Complete output is checked before display; React escaped text and security headers reduce injection risk."] },
      { heading: "Deployment responsibilities", paragraphs: ["[Project Owner] must maintain HTTPS, dependency updates, host controls, rate limiting, secret rotation, restricted environment access, and review of hosting logs and retention. Use only a trusted OpenRouter base URL. Local deletion cannot erase third-party or platform data."] },
      { heading: "Reporting a vulnerability", paragraphs: ["Report suspected vulnerabilities privately to [Project Owner] through [Institution]’s approved security contact. Do not publish exploit details, secrets, personal information, or health content. Use minimal synthetic reproductions only and never test against a deployment or third party without authorization. No bug bounty or response SLA is promised by this template."] },
      { heading: "No absolute claims", paragraphs: ["No security control is complete and prompt/PII filters can be bypassed. Clinora AI does not claim HIPAA compliance, regulatory certification, clinical validation, or absolute security. Professional security and legal review is required before public or commercial use."] },
    ],
  },
  "ai-transparency": {
    slug: "ai-transparency",
    title: "AI Transparency",
    description: "What the optional model does, what it receives, and how citations and output limits work.",
    sections: [
      { heading: "Purpose and provider", paragraphs: ["Ask Clinora AI optionally uses OpenRouter with a developer-selected currently free model for general educational information, explaining scope, and organizing appointment questions. It is not a doctor, diagnostic system, treatment system, test interpreter, emergency service, or clinically validated product."] },
      { heading: "Data sent after user action", paragraphs: ["After explicit Send, adult/consent attestation, and emergency/PII checks, the server sends the current message and up to three original local knowledge summaries with server-side safety instructions. Prior turns, Guided Check drafts, saved history, and the API key are not sent to the model. OpenRouter’s own data terms apply."] },
      { heading: "Retrieval and citations", paragraphs: ["Knowledge cards are original summaries, not scraped articles or clinical datasets. Local weighted keyword retrieval selects a small number of cards. Only links exactly matching local metadata are appended under “Related resources supplied to Clinora AI”. They do not validate output and the model is not allowed to invent citations."] },
      { heading: "Validation and streaming", paragraphs: ["Upstream output is collected and checked before any answer text reaches the browser. Diagnostic assertions, probabilities, treatment or dose instructions, test interpretation, emergency wording, generated links, and secret disclosure can cause rejection. Safe text then streams; unsafe text is discarded. Provider failure produces no substitute answer."] },
      { heading: "Explainability and limitations", paragraphs: ["Panels show rule categories, retrieved card titles, local-data behavior, and whether OpenRouter was contacted. They never show system prompts, keys, internal logs, hidden reasoning, or chain-of-thought. AI can still be wrong, incomplete, or outdated; consult a qualified clinician and never delay emergency care."] },
    ],
  },
  "data-governance": {
    slug: "data-governance",
    title: "Data Governance",
    description: "Data minimization, provenance, retention, and change-control rules.",
    sections: [
      { heading: "Minimization and provenance", paragraphs: ["No real patient data, medical records, clinical datasets, scraped health content, or copied medical encyclopedias may be introduced. Knowledge entries are original summaries with separate public-organization reference metadata. Health content must not enter URLs, localStorage, test fixtures, telemetry, or issue reports."] },
      { heading: "Lifecycle", bullets: ["Consent and settings: localStorage until reset, deletion, or browser clearing.", "Guided drafts and unsaved chat: memory only and potentially lost on reload.", "Saved summaries: IndexedDB after explicit Save until user/browser deletion.", "Current chat plus selected original cards: OpenRouter after Send, subject to separate provider/platform terms.", "API key and model: server environment, developer controlled."] },
      { heading: "User control and integrity", paragraphs: ["Users can print without saving, delete one entry, or Delete All Local Data. Validation, escaped rendering, source allowlisting, and output checks support integrity but do not guarantee correctness. Local saved data is not represented as encrypted or safe from other users of a shared profile."] },
      { heading: "Third-party and hosting governance", paragraphs: ["Before deployment, [Project Owner] must document actual host/provider regions, retention, subprocessors, free-model data terms, access controls, deletion rights, incident response, and lawful basis in [Country/Jurisdiction]. Delete All cannot erase transmitted, third-party, or platform data."] },
      { heading: "Change control", paragraphs: ["New data fields require a documented purpose, minimization review, architecture and threat-model update, tests, and legal review. Cloud health profiles, automatic saving, hidden identifiers, analytics, advertising, and real clinical datasets are forbidden expansions."] },
    ],
  },
};
