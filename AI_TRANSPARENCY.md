# AI Transparency

**Student-project template — not legal advice.** Professional legal, clinical-safety, and AI-governance review is required before public or commercial use.  
[Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date]

## What the AI does

“Ask Clinora AI” optionally uses OpenRouter with a developer-selected currently free model to provide general educational information, explain Clinora's scope, and help organize appointment questions. It does not diagnose, prescribe, treat, dose, rank diseases, calculate probabilities, or interpret labs/images/clinical documents. It is not a doctor, medical device, emergency service, or clinically validated system.

## What is sent

After explicit Send, adult/consent attestation, emergency and PII checks, the server sends the current message and up to three original local knowledge summaries. System safety instructions and the configured model identifier are used server-side. Prior turns, Guided Check drafts, saved history, and the API key are not sent to the model. OpenRouter's own data terms apply.

## Retrieval and citations

Knowledge cards are original Clinora AI summaries, not scraped articles or clinical datasets. Source metadata is separate. Retrieval is local weighted keyword matching, not a vector database or diagnostic engine. Cards are treated as untrusted bounded data. Only verified local source links are appended under “Related resources supplied to Clinora AI”; links do not validate output.

## Output controls and limitations

Upstream output is collected and checked before any answer text reaches the browser. Diagnostic assertions, probabilities, treatment/dose instructions, test interpretation, emergency wording, and generated links can cause rejection. Safe output is then streamed. Unsafe output is replaced by a fixed boundary message. Provider failures produce no substitute answer.

These controls cannot guarantee correctness, completeness, currentness, or detection of every unsafe phrase/jailbreak. Users must consult qualified clinicians. Never delay emergency care; contact local emergency services for possible emergencies.

## Explainability without hidden reasoning

Panels may show activated general rule categories, retrieved card titles, local-data status, and whether OpenRouter was contacted. They never reveal system prompts, API keys, internal logs, chain-of-thought, or hidden reasoning.

## Local history and tracking

Summaries persist locally only after explicit Save. Clinora AI has no cloud accounts/health records, analytics, advertising, or trackers. Local deletion cannot retract data already sent to third parties. “Clinora AI” is not claimed as a registered trademark; a real search is required before launch.
