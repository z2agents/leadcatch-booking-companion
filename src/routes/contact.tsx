import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/landing/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { CONTACT_EMAIL, CONTACT_PHONE, SMS_DISCLOSURE, contactSchema } from "@/lib/contact";
import { submitContact } from "@/lib/contact.functions";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("/contact", "Contact Z2 Agents", "Questions about AI booking agents? Send Z2 Agents a message."),
  component: Contact,
});

type Fields = "fullName" | "email" | "phone" | "message";
const fields: { name: Fields; label: string; type: string; autoComplete: string }[] = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
];

function Contact() {
  const send = useServerFn(submitContact);
  const [values, setValues] = useState<Record<Fields, string>>({ fullName: "", email: "", phone: "", message: "" });
  const [smsConsent, setSmsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ ...values, smsConsent, marketingConsent });
    if (!parsed.success) {
      const next: Partial<Record<Fields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Fields;
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await send({ data: parsed.data });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const set = (name: Fields) => (v: string) => setValues((s) => ({ ...s, [name]: v }));

  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Say" accent="hello." line="Questions? We reply fast." />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: CONTACT_EMAIL },
              { icon: Phone, label: "Phone", value: CONTACT_PHONE },
            ]
              .filter((c) => c.value)
              .map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 text-claret">
                <span className="grid size-11 place-items-center rounded-xl bg-claret text-lime">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
                  <p className="font-display text-lg font-semibold">{value}</p>
                </div>
              </div>
            ))}
            <div className="grain relative overflow-hidden rounded-3xl bg-claret-deep p-6 text-bone">
              <p className="font-display text-2xl font-semibold">
                Rather talk? <span className="text-serif-accent text-lime">Book a call.</span>
              </p>
              <Button asChild variant="lime" className="mt-5 h-11 px-5">
                <Link to="/book">
                  Book a free demo <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-lift md:p-8">
              {status === "sent" ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center text-claret" role="status">
                  <span className="grid size-16 animate-pop place-items-center rounded-full bg-lime text-claret-deep shadow-glow">
                    <Check className="size-7" />
                  </span>
                  <h2 className="mt-6 text-4xl font-bold">
                    Message <span className="text-serif-accent">sent.</span>
                  </h2>
                  <p className="mt-2 text-muted-foreground">We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {fields.map((f) => (
                      <div key={f.name} className={f.name === "fullName" ? "sm:col-span-2" : ""}>
                        <Label htmlFor={f.name} className="text-claret">
                          {f.label}
                        </Label>
                        <Input
                          id={f.name}
                          type={f.type}
                          autoComplete={f.autoComplete}
                          value={values[f.name]}
                          onChange={(e) => set(f.name)(e.target.value)}
                          aria-invalid={!!errors[f.name]}
                          className="mt-2 h-12 rounded-xl bg-background"
                        />
                        {errors[f.name] && <p className="mt-1.5 text-sm text-destructive">{errors[f.name]}</p>}
                      </div>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-claret">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => set("message")(e.target.value)}
                      aria-invalid={!!errors.message}
                      className="mt-2 rounded-xl bg-background"
                    />
                    {errors.message && <p className="mt-1.5 text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <ConsentBox
                    id="smsConsent"
                    checked={smsConsent}
                    onChange={setSmsConsent}
                    label="I agree to receive SMS updates from Z2 Agents about my request."
                  />
                  <ConsentBox
                    id="marketingConsent"
                    checked={marketingConsent}
                    onChange={setMarketingConsent}
                    label="I agree to receive occasional marketing messages from Z2 Agents."
                  />

                  <p className="text-xs text-muted-foreground">
                    See our{" "}
                    <Link to="/privacy-policy" className="text-claret underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/terms-of-service" className="text-claret underline">
                      Terms of Service
                    </Link>
                    .
                  </p>

                  {status === "error" && (
                    <p className="text-sm text-destructive" role="alert">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <Button type="submit" variant="claret" size="xl" className="w-full sm:w-auto" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send message"} <ArrowRight />
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

function ConsentBox({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-bone-deep/60 p-4">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5 size-5" />
      <Label htmlFor={id} className="block cursor-pointer text-sm font-normal leading-relaxed text-claret">
        {label} <span className="text-muted-foreground">{SMS_DISCLOSURE}</span>
      </Label>
    </div>
  );
}
