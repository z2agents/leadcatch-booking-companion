import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./lead";
import { consentNote } from "./consent";

/** Public: sends a booking-flow lead to GoHighLevel. Never blocks the visitor if GHL is down. */
export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { sendLeadToGhl, splitName } = await import("./ghl.server");
    const tags = ["website-lead", "booking-started"];
    if (data.smsConsent) tags.push("sms-consent");
    if (data.marketingConsent) tags.push("marketing-consent");
    const saved = await sendLeadToGhl({
      ...splitName(data.fullName),
      email: data.email,
      phone: data.phone,
      tags,
      note: consentNote("lead", data, data.page),
    });
    return { ok: true as const, saved };
  });
