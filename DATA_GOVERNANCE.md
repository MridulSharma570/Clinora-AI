# Data Governance

**Student-project template — not legal advice.** Professional legal/privacy/security review is required before public or commercial use.  
[Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date]

## Data minimization and provenance

Clinora AI is educational, not medical advice, and does not diagnose, prescribe, treat, or interpret tests. No real patient data, real medical records, clinical datasets, scraped health content, or copied medical encyclopedias may be introduced. Knowledge entries are original summaries with separate public-organization reference metadata.

## Data classes and lifecycle

| Data | Location | Retention/control |
|---|---|---|
| Consent/adult attestation | localStorage | Until reset/Delete All/browser clearing |
| Theme/contrast/local number | localStorage | Until reset/Delete All/browser clearing |
| Guided draft and unsaved chat | React memory | Current page session/reload only |
| Saved summary | IndexedDB | Explicit Save until single/Delete All/browser clearing |
| Current chat + selected original cards | Server request/OpenRouter after Send | Provider/platform terms; outside local deletion |
| API key/model | Server environment | Developer controlled; never browser storage |

No cloud accounts, cloud health records, sync, EHR, analytics, advertising, trackers, payments, or application health-content logs exist. Health content must not be placed in URLs, localStorage, test fixtures, telemetry, or issue reports.

## Integrity and user control

Strict schemas, bounded text, escaped rendering, local source validation, and output checks support integrity but do not guarantee correctness. AI output can be wrong, incomplete, or outdated. Users can print without saving, delete one entry, or Delete All Local Data. Saved local data is not represented as encrypted or safe from other users of a shared browser profile.

## Third-party governance

Before deployment, [Project Owner] must document actual host/provider regions, retention, subprocessors, free-model data terms, access controls, deletion rights, incident response, and lawful basis in [Country/Jurisdiction]. Delete All cannot erase transmitted/third-party/platform data. No HIPAA compliance or regulatory certification is claimed.

## Change control

New data fields require a documented purpose, minimization review, storage/threat-model update, tests, and legal review. Forbidden expansion includes cloud health profiles, automatic saving, hidden identifiers, advertising/analytics, and real clinical datasets.
