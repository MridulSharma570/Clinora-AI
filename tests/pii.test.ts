import { describe, expect, it } from "vitest";
import { detectPii, piiEditMessage } from "@/lib/privacy/pii";

describe("high-confidence PII detection", () => {
  it("detects an email address", () => {
    expect(detectPii("Contact me at person@example.com").map((match) => match.kind)).toContain("email");
  });

  it.each(["+1 (415) 555-0132", "415-555-0132", "+91 98765 43210"])("detects phone number %s", (phone) => {
    expect(detectPii(`My number is ${phone}`).map((match) => match.kind)).toContain("phone");
  });

  it("detects long ID-like and account-like sequences", () => {
    const matches = detectPii("Record 123456789 and account 4111 1111 1111 1111");
    expect(matches.map((match) => match.kind)).toEqual(expect.arrayContaining(["identifier", "account"]));
  });

  it("detects a likely street address", () => {
    expect(detectPii("I live at 123 Main Street").map((match) => match.kind)).toContain("address");
  });

  it.each([
    "This started about 2 weeks ago",
    "How can I prepare for my 2026 appointment?",
    "I am 18 or older",
    "What should I track for 7 days?",
  ])("allows non-identifying preparation text: %s", (text) => {
    expect(detectPii(text)).toEqual([]);
  });

  it("asks the user to edit rather than silently redacting", () => {
    const message = piiEditMessage(detectPii("person@example.com"));
    expect(message).toContain("edit your message");
    expect(message).toContain("email address");
  });
});
