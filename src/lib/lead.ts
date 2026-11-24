import { z } from "zod";
import { pageField } from "./consent";

/** Step 1 of the booking flow: who is booking. */
export const leadSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name").max(100, "Keep it under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Keep it under 255 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(30, "Please enter a valid phone number")
    .regex(/^[+\d][\d\s().-]*$/, "Please enter a valid phone number"),
  // Consent is optional and never required to continue (carrier rules).
  smsConsent: z.boolean().default(false),
  marketingConsent: z.boolean().default(false),
  page: pageField,
});

export type LeadInput = z.input<typeof leadSchema>;

const KEY = "z2_lead";

/** Keeps the visitor's details in this tab only, so the calendar can be pre-filled without putting them in the URL. */
export function saveLeadLocally(lead: { fullName: string; email: string; phone: string }) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(lead));
  } catch {
    /* storage blocked: the calendar just won't be pre-filled */
  }
}

export function readLeadLocally(): { fullName: string; email: string; phone: string } | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
