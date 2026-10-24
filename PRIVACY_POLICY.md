# Privacy Policy — Clinora AI

**STUDENT-PROJECT TEMPLATE. NOT LEGAL ADVICE. PROFESSIONAL LEGAL/PRIVACY REVIEW IS REQUIRED BEFORE PUBLIC OR COMMERCIAL USE.**

[Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date]

## Overview

Clinora AI is educational pre-visit software, not medical advice or a medical record service. It does not diagnose, prescribe, treat, or interpret tests. AI output may be incorrect, incomplete, or outdated. In a possible emergency, contact local emergency services rather than relying on this policy or app.

## Information the app handles

- **Consent/settings:** adult/consent attestation, theme, contrast, and optional local emergency number in localStorage.
- **Guided draft:** concern, timing, severity, optional context, and questions in React memory only. Reloading may erase it.
- **Saved summaries:** only after explicit Save, in origin-bound IndexedDB with timestamp/title/content.
- **Chat:** current message in memory; after Send and safety checks, current message plus selected original knowledge cards is transmitted through the server to OpenRouter.
- **Technical data:** the app does not intentionally collect analytics or health logs. Hosting infrastructure may process standard network metadata under its own policies; [Project Owner] must document a real deployment separately.

The app asks users not to submit names, emails, phone numbers, addresses, IDs, account/insurance numbers, private records, or other people's information. High-confidence patterns are blocked, but free-form PII detection is incomplete.

## What the app does not do

No user accounts, authentication, cloud patient profiles, cloud health records, cloud sync, EHR integration, advertising, analytics, cross-site trackers, payment systems, or sale of personal information are implemented. No real patient data or clinical dataset is included.

## Local storage and deletion

You may delete one saved summary or use Delete All Local Data to remove IndexedDB history, consent, settings, and feasible Clinora cache data. Browser storage is not represented as encrypted, anonymous, or inaccessible to others using the same browser profile. Browser eviction, device access, malware, extensions, and backups are outside the app's control.

Deleting local data does not retract content already sent to OpenRouter or erase provider/hosting logs and backups. Those processes require separate review and action.

## Third-party AI processing

OpenRouter is optional and developer-configured. It receives data only after user action and only when safety checks permit. The current message and original retrieval summaries are sent; no prior turns, saved summaries, Guided Check draft, API key, or account identifier is intentionally included. Free-model/provider terms, retention, training, location, and subprocessors can change and must be reviewed before deployment. Do not use chat with sensitive details you do not want transferred.

## Legal placeholders and contact

Data controller/operator: [Project Owner], [Institution]. Jurisdiction: [Country/Jurisdiction]. Effective date: [Effective Date]. Contact and applicable rights/request procedures must be completed after professional review. This template does not claim HIPAA compliance or any other regulatory certification.
