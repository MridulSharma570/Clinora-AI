# Clinora AI — Internal HTTP API

Clinora AI has no public health-record API. These same-origin route handlers support the optional chat interface. No endpoint returns saved history, consent records, prompts, keys, logs, or chain-of-thought.

## `GET /api/chat/status`

Returns a boolean only. It never exposes the model identifier, key, base URL, or provider error.

```json
{ "configured": false }
```

- `200`: status known.
- `Cache-Control: no-store`.

## `POST /api/chat`

### Request

`Content-Type: application/json`; strict Zod object, unknown keys rejected.

```json
{
  "message": "How can I organize questions for my appointment?",
  "consentConfirmed": true,
  "adultConfirmed": true
}
```

- `message`: trimmed string, 1–2,000 characters.
- Consent/adult fields must be literal `true`. They are attestations, not verified identity.
- No roles, model, base URL, files, images, prior messages, user identifiers, or saved history are accepted.

### Processing order

1. JSON parsing and consent/adult attestation check.
2. Full strict Zod request validation.
3. Deterministic emergency/crisis routing.
4. High-confidence PII detection.
5. Configuration check.
6. Bounded original knowledge retrieval (maximum three cards).
7. Server-side OpenRouter request with timeout; current message and selected original cards only.
8. Complete response collection and emergency/unsafe-output/link validation before downstream display.
9. Verified local resource metadata plus validated text streamed as NDJSON.

No health prompt, answer, retrieval content, key, or provider error body is application-logged.

### Successful streamed response

Status `200`, `Content-Type: application/x-ndjson`, `Cache-Control: no-store`.

Each line is an independent JSON event:

```json
{"type":"meta","resources":[{"id":"preparing-appointment","title":"Prepare for a healthcare appointment","sourceOrganization":"MedlinePlus","sourceUrl":"https://medlineplus.gov/"}],"openRouterContacted":true}
{"type":"delta","text":"Validated educational text…"}
{"type":"done"}
```

The complete answer is validated before the first event is emitted. `resources` are generated from local metadata, not model citations. The client adds the required limitation labels.

### Blocked/error JSON responses

All responses use generic content and never include secret/provider internals.

| Situation | HTTP | `kind` | Behavior |
|---|---:|---|---|
| Invalid JSON/schema | 400 | `invalid` | Correct request; no provider call |
| Consent/adult not attested | 403 | `consent` | Return to consent; no provider call |
| Emergency/crisis wording | 422 | `emergency` | Includes `redirect: "/emergency"` and safe rule-category labels; no provider call |
| High-confidence PII | 422 | `pii` | Edit message; no provider call |
| Missing configuration | 503 | `unavailable` | Guided Check remains available |
| Timeout/provider/malformed response | 502 | `unavailable` | No simulated/fallback answer |
| Unsafe model output | 200 | `blocked` | Fixed safety-boundary message; unsafe content discarded |
| Emergency language in model output | 200 | `emergency` | Emergency redirect; answer discarded |

Example unavailable body:

```json
{
  "kind": "unavailable",
  "message": "AI chat is not configured or is temporarily unavailable. You can still use Guided Check to prepare questions for a healthcare visit."
}
```

Example blocked body:

```json
{
  "kind": "blocked",
  "message": "I can help you prepare questions for a qualified clinician, but I cannot diagnose, recommend treatment, or provide medication instructions."
}
```

## Local-only interfaces (not HTTP)

- `features/guided-check`: in-memory draft and deterministic summary generation.
- `lib/storage/history.ts`: IndexedDB save/list/delete/clear after user action.
- `lib/storage/delete-all.ts`: local history, consent, settings, and feasible cache deletion.
- `lib/retrieval`: original card lookup and source validation; no remote retrieval service.
