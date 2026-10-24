export interface PiiMatch {
  kind: "email" | "phone" | "identifier" | "address" | "account";
  label: string;
}

const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const identifierPattern = /\b(?:[A-Z]{1,4}[-\s])?\d{9,}(?:[-\s]\d{1,6})?\b/i;
const ssnPattern = /\b\d{3}-\d{2}-\d{4}\b/;
const accountPattern = /\b(?:\d[ -]*?){13,19}\b/;
const addressPattern = /\b\d{1,6}\s+(?:[A-Z0-9.'’-]+\s+){0,4}(?:street|st|road|rd|avenue|ave|lane|ln|drive|dr|boulevard|blvd|court|ct|way)\b/i;
const phoneCandidatePattern = /\+?\d[\d\s().-]{6,}\d/g;

function hasPhoneNumber(input: string): boolean {
  const candidates = input.match(phoneCandidatePattern) ?? [];
  return candidates.some((candidate) => {
    const digits = candidate.replace(/\D/g, "");
    const international = candidate.trim().startsWith("+");
    return international ? digits.length >= 8 && digits.length <= 15 : digits.length >= 10 && digits.length <= 15;
  });
}

/** High-confidence examples only. Names and free-form identifiers cannot be reliably detected. */
export function detectPii(input: string): PiiMatch[] {
  const normalized = input.normalize("NFKC").slice(0, 12_000);
  const matches: PiiMatch[] = [];

  if (emailPattern.test(normalized)) matches.push({ kind: "email", label: "an email address" });
  if (hasPhoneNumber(normalized)) matches.push({ kind: "phone", label: "a phone number" });
  if (ssnPattern.test(normalized) || identifierPattern.test(normalized)) {
    matches.push({ kind: "identifier", label: "a long ID-like number" });
  }
  if (accountPattern.test(normalized)) matches.push({ kind: "account", label: "a long account-like number" });
  if (addressPattern.test(normalized)) matches.push({ kind: "address", label: "a possible street address" });

  return matches;
}

export function piiEditMessage(matches: PiiMatch[]): string {
  return `Please edit your message to remove ${matches.map((match) => match.label).join(", ")}. Do not send private identity or record details.`;
}
