import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact";

/**
 * Public: one contact-form submission. Sent to GoHighLevel (the CRM) and, if configured,
 * also saved in the site database. Succeeds if at least one of the two worked.
 */
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { sendLeadToGhl, splitName } = await import("./ghl.server");
    const tags = ["website-lead", "contact-form"];
    if (data.smsConsent) tags.push("sms-consent");
    if (data.marketingConsent) tags.push("marketing-consent");
    const toGhl = await sendLeadToGhl({
      ...splitName(data.fullName),
      email: data.email,
      phone: data.phone,
      tags,
      note: `Website contact form:\n${data.message}`,
    });

    let toDb = false;
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from("contact_submissions").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        sms_consent: data.smsConsent,
        marketing_consent: data.marketingConsent,
      });
      if (error) console.error("contact insert failed", error);
      else toDb = true;
    } catch (err) {
      console.error("site database not available", err);
    }

    if (!toGhl && !toDb) throw new Error("We couldn't send your message. Please try again.");
    return { ok: true as const };
  });
