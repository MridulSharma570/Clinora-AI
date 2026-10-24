# Deployment Guide

## Deployment warning

Clinora AI is a student final-year project, not a clinically validated or legally reviewed service. Professional legal, clinical-safety, privacy, security, accessibility, and trademark review is required before public or commercial deployment. Do not represent it as HIPAA-compliant, FDA/CE-cleared, a medical device, or an emergency service.

## Runtime

Use a Node.js 22.12+ environment that supports Next.js Route Handlers. A static-only export cannot provide `/api/chat`. Install with the lockfile and verify before deployment:

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npx playwright install --with-deps chromium
npm run test:e2e
npm run build
npm run start
```

Bind the production server to the platform-required host/port. Browser code uses relative same-origin API URLs; never point browser code at `localhost` for another service.

## Environment variables

| Variable | Exposure | Required | Notes |
|---|---|---|---|
| `OPENROUTER_API_KEY` | Server only | For AI | Developer-owned secret; never `NEXT_PUBLIC_*` |
| `OPENROUTER_MODEL` | Server only | For AI | Exact currently available free model identifier; recheck often |
| `OPENROUTER_BASE_URL` | Server only | Optional | Default `https://openrouter.ai/api/v1`; developer-controlled only |
| `NEXT_PUBLIC_APP_NAME` | Public | Optional | Non-secret display name |
| `NEXT_PUBLIC_DEFAULT_EMERGENCY_NUMBER` | Public | Optional | Non-secret default local number; users can override locally |
| `NEXT_TELEMETRY_DISABLED` | Build tool only | Optional | Set to `1` to disable Next.js telemetry; not an application analytics setting |

Use the deployment platform's encrypted environment-variable settings. Never commit `.env.local`, place secrets in Docker image layers, or expose them in build logs. Restrict the optional base URL to a trusted OpenRouter endpoint; a malicious configuration could receive the key.

## Choosing a free model

Check OpenRouter's official current model catalog at deployment time and filter for free availability. Confirm exact identifier, pricing, context limits, rate limits, and data-use policy. Do not copy an old example identifier from a tutorial. The application intentionally has no hardcoded model or fallback model. Remove/update configuration if the model is no longer free; never silently switch to a paid model.

## Platform controls to review

- HTTPS and trusted domain/host allowlist.
- Rate limiting/abuse controls for the public chat route; the student app has no accounts.
- Platform access logs, error logs, retention, and regional processing. Clinora AI does not log message content itself, but a platform may capture request metadata.
- Environment-secret access and rotation procedures.
- Security-header compatibility with the platform and Next.js runtime.
- OpenRouter's current privacy, retention, free-model, and downstream-model provider terms.

## Failure and rollback

If configuration is absent or OpenRouter fails, chat reports unavailable and Guided Check remains functional. There is no backup AI provider or generated fallback answer. To disable AI immediately, remove either server variable and restart/redeploy. Keep the emergency, learning, legal, Guided Check, print, and local history routes available.

## Data deletion limitations

Delete All acts in the current browser/origin only. It cannot erase content already transmitted to OpenRouter, provider-side records, platform backups/logs, or data on another browser/device. Review third-party deletion procedures independently before any real deployment.
