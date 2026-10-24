# Security Policy

**Student-project template — not legal advice.** Professional security/legal review is required before public or commercial use.  
[Project Owner] · [Institution] · [Country/Jurisdiction] · [Effective Date]

## Reporting a vulnerability

Report suspected vulnerabilities privately to [Project Owner] through [Institution]'s approved private security contact. Do not open a public issue containing exploit details, secrets, personal information, or health content. Do not use real patient data to test. Include a minimal synthetic reproduction, affected file/route, and impact. This student template does not promise a formal bug bounty or response SLA.

Do not send API keys or request credentials through chat. Never test against a deployment or third-party provider without authorization.

## Security boundaries

- OpenRouter keys/model configuration are server-only; the browser receives a boolean availability status.
- Strict request schemas, input limits, deterministic emergency/PII checks, request timeouts, generic errors, and no application health-content logging reduce exposure.
- Original retrieval content is bounded and treated as untrusted. The model has no tools or privileged actions.
- Complete model output is validated before display; React escaped text and security headers reduce script-injection risk.
- Saved health summaries exist only in local IndexedDB after explicit Save. No cloud account/record or server history exists.

## Deployment responsibilities

Maintain dependency updates, HTTPS, platform host controls, rate limiting, secret rotation, restricted environment access, and review of hosting logs/retention. Use only the trusted OpenRouter base URL. Delete All cannot erase third-party/platform data. No HIPAA compliance, regulatory certification, clinical validation, or absolute security is claimed.

Clinora AI is educational, not medical advice; it does not diagnose, prescribe, treat, or interpret tests. AI may be incorrect, incomplete, or outdated. Contact local emergency services in an emergency. The app has no analytics, ads, or trackers; OpenRouter receives current chat content and selected original cards only after user action.
