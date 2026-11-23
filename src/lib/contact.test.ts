import { describe, expect, it } from "vitest";
import { contactSchema, SMS_DISCLOSURE } from "./contact";

const base = { fullName: "Ana Lee", email: "ana@example.com", phone: "+1 555 123 4567", message: "Hi" };

describe("contact form", () => {
  it("sends without ticking either consent box, and both default to unticked", () => {
    const r = contactSchema.parse(base);
    expect(r.smsConsent).toBe(false);
    expect(r.marketingConsent).toBe(false);
  });
  it("keeps SMS and marketing consent separate", () => {
    const r = contactSchema.parse({ ...base, smsConsent: true, marketingConsent: false });
    expect(r.smsConsent).toBe(true);
    expect(r.marketingConsent).toBe(false);
  });
  it("requires full name, email, phone and message", () => {
    for (const key of ["fullName", "email", "phone", "message"] as const) {
      expect(contactSchema.safeParse({ ...base, [key]: "" }).success).toBe(false);
    }
  });
  it("SMS disclosure includes frequency, rates, STOP and HELP", () => {
    expect(SMS_DISCLOSURE).toContain("Message frequency varies");
    expect(SMS_DISCLOSURE).toContain("Message and data rates may apply");
    expect(SMS_DISCLOSURE).toContain("Reply STOP to opt out");
    expect(SMS_DISCLOSURE).toContain("HELP for help");
  });
});
