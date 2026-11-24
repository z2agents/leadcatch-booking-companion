import { z } from "zod";

/**
 * The exact consent sentences shown on the site. The forms render these and the CRM note quotes them,
 * so the proof always matches what the visitor actually saw. Edit wording here only.
 */
export const CONSENT_TEXT = {
  lead: {
    sms: "Text me about my booking from Z2 Agents.",
    marketing: "Send me occasional offers from Z2 Agents.",
  },
  contact: {
    sms: "I agree to receive SMS updates from Z2 Agents about my request.",
    marketing: "I agree to receive occasional marketing messages from Z2 Agents.",
  },
} as const;

/** Page the form was sent from (sent by the browser, stored only as evidence). */
export const pageField = z.string().trim().max(500).optional();

/** Consent proof for the contact's notes in GHL: time, page, and each box with its exact wording. */
export function consentNote(
  form: keyof typeof CONSENT_TEXT,
  given: { smsConsent: boolean; marketingConsent: boolean },
  page?: string,
) {
  const text = CONSENT_TEXT[form];
  const box = (ticked: boolean, wording: string) => `${ticked ? "[x] TICKED" : "[ ] not ticked"}: "${wording}"`;
  return [
    "Consent record",
    `Time (UTC): ${new Date().toISOString()}`,
    `Page: ${page || "unknown"}`,
    `Form: ${form === "lead" ? "booking pop-up (step 1)" : "contact page"}`,
    `SMS: ${box(given.smsConsent, text.sms)}`,
    `Marketing: ${box(given.marketingConsent, text.marketing)}`,
  ].join("\n");
}
