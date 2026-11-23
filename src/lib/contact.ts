import { z } from "zod";

/** Public contact details. Leave CONTACT_PHONE empty to hide the phone card. */
export const CONTACT_EMAIL = "z2agents.official@gmail.com";
export const CONTACT_PHONE = "";

/** Required carrier disclosure shown under each SMS consent box. */
export const SMS_DISCLOSURE =
  "Message frequency varies. Message and data rates may apply. Reply STOP to opt out, HELP for help.";

export const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name").max(100, "Keep it under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Keep it under 255 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(30, "Please enter a valid phone number")
    .regex(/^[+\d][\d\s().-]*$/, "Please enter a valid phone number"),
  message: z.string().trim().min(1, "Please add a short message").max(1000, "Keep it under 1000 characters"),
  // Both consents are optional and independent: sending the form never requires either.
  smsConsent: z.boolean().default(false),
  marketingConsent: z.boolean().default(false),
});

export type ContactInput = z.input<typeof contactSchema>;
