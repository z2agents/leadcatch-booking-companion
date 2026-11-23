import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact";

/** Public: saves one contact-form submission. Visitors can't read submissions back. */
export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message,
      sms_consent: data.smsConsent,
      marketing_consent: data.marketingConsent,
    });
    if (error) {
      console.error("contact insert failed", error);
      throw new Error("We couldn't send your message. Please try again.");
    }
    return { ok: true as const };
  });
