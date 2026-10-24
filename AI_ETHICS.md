# Clinora AI — AI Ethics and Responsible Use Statement

**Project:** CLINORA AI — “Prepare for care. Not a diagnosis.”  
**Status:** educational student-project governance template; not a clinical validation, certification, or legal determination.

## Intended benefit

Clinora AI is designed to help adults organize their own words, notice missing details, and prepare questions for a qualified healthcare professional. The local Guided Check is the primary feature and remains useful without AI. The project does not aim to replace clinical judgment, triage patients, diagnose disease, rank possible diseases, recommend treatment, or interpret tests, images, or records.

## Human oversight and autonomy

- Users choose whether to enter Guided Check or optional AI chat.
- A qualified clinician remains responsible for assessment, diagnosis, and care decisions.
- The interface asks users to verify information, edit saved wording, and seek professional care rather than presenting output as instructions.
- There are no accounts, engagement scores, persuasive recommendations, treatment nudges, or disease/risk rankings.
- Generated text is labeled as AI-assisted educational preparation, not medical advice.

## Safety by deterministic boundaries

Emergency and crisis phrases are assessed by transparent local rules before Guided Check submission, before an OpenRouter request, and before model text can be displayed. An LLM is never asked to decide whether a situation is an emergency. Deterministic output checks discard diagnostic, treatment, dosage, lab/image interpretation, emergency, and unverified-link content. A fixed scope-boundary notice may explain a block; it is not a generated substitute answer.

No safety filter is perfect. Urgent care must never depend on this application. The Emergency page directs users to local emergency services or a trusted person and does not attempt remote triage.

## Privacy and data minimization

- No real patient records, clinical datasets, accounts, or cloud patient profiles are used to build the project.
- The current message and bounded original retrieval cards are the only intended application-provided AI prompt content; saved history and chain-of-thought are not requested or sent.
- High-confidence common PII patterns block a request before provider access so the user can edit it.
- History is saved only after an explicit action in browser IndexedDB; health content is not placed in `localStorage`.
- Application code does not log health prompts, responses, keys, provider error bodies, or chain-of-thought.
- Users receive deletion controls, while the limits of browser, host, provider, backup, and downloaded-copy deletion are disclosed.

## Knowledge, attribution, and explainability

The local knowledge cards and learning articles are original educational drafts. Separate metadata records source organization, official URL, last-reviewed date, and educational scope. They are not copied medical encyclopedia entries and are not represented as complete clinical guidance. Lightweight local retrieval selects a small number of cards; “Why am I seeing this?” explains the reason and source. Resource links come from verified local metadata rather than model-invented citations.

## Fairness, accessibility, and inclusion

The adult-only scope, limited English phrase rules, small knowledge base, keyword retrieval, and general-purpose external model create important limitations. They may not work equally well across languages, dialects, literacy levels, disabilities, cultures, or ways of describing distress. The project therefore avoids claims of representativeness, clinical validity, or equitable performance.

Accessibility measures include semantic landmarks, labels, keyboard operation, visible focus, minimum 44px controls, contrast/high-contrast settings, reduced-motion support, plain-language summaries, and a non-AI route to the core question list. Automated checks do not establish full accessibility or usability; testing with diverse users and accessibility professionals remains necessary.

## Transparency and limitations

The AI can be absent, wrong, incomplete, overconfident, or unavailable. A configured external model is developer-selected; users are never asked for an API key. There is no hidden local model, mock provider, generated fallback, or automatic answer on failure. The unavailable state directs users back to the working local preparation flow.

The project has not undergone clinical trials, external safety validation, regulatory review, or certification as a medical device. Passing software tests demonstrates the tested code paths only. It does not prove medical accuracy, safety for every message, complete PII detection, or freedom from bias.

## Responsible development and review

Before any public or research deployment, the student/institution should obtain appropriate clinical, privacy, security, accessibility, ethical, and legal review; verify current provider terms; define an incident and takedown process; and reassess the emergency lexicon, PII rules, source material, and output boundaries. New use cases such as minors, diagnosis, treatment, symptom-to-disease prediction, patient-record interpretation, or clinician decision support are outside scope and require a different governance process—not merely a prompt change.

**Review owner:** [Name / Role]  
**Next review:** [YYYY-MM-DD]  
**Feedback or safety concern:** [Project Contact / Repository Issue Process]
