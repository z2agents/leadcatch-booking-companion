import { createContext, useCallback, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SMS_DISCLOSURE } from "@/lib/contact";
import { leadSchema, readLeadLocally, saveLeadLocally } from "@/lib/lead";
import { submitLead } from "@/lib/lead.functions";

/**
 * Step 1 of the booking flow (like a funnel pop-up): a short form that saves the lead
 * in GoHighLevel, then moves the visitor to /book with the calendar pre-filled.
 */
const LeadFlowContext = createContext<{ open: () => void }>({ open: () => {} });

export function useLeadFlow() {
  return useContext(LeadFlowContext);
}

export function LeadFlowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  return (
    <LeadFlowContext.Provider value={{ open }}>
      {children}
      <LeadDialog open={isOpen} onOpenChange={setOpen} />
    </LeadFlowContext.Provider>
  );
}

/** Animated shell shared by the site's pop-ups. */
export function Z2Dialog({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="z2-overlay fixed inset-0 z-[60] bg-claret-deep/70 backdrop-blur-sm" />
        <div className="pointer-events-none fixed inset-0 z-[61] grid place-items-center overflow-y-auto p-4">
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="z2-dialog pointer-events-auto relative w-full max-w-lg rounded-[2rem] border border-border bg-card p-6 text-claret shadow-lift md:p-8"
          >
            <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
            {children}
            <DialogPrimitive.Close
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-claret/60 transition-colors hover:bg-bone-deep hover:text-claret focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              aria-label="Close"
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </div>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/**
 * Opens the step-1 form once per visit, as soon as the visitor has scrolled past the section with this id.
 * Skipped if they already filled it in during this visit.
 */
export function AutoOpenAfter({ id }: { id: string }) {
  const { open } = useLeadFlow();
  useEffect(() => {
    const KEY = "z2_auto_lead";
    try {
      if (sessionStorage.getItem(KEY) || readLeadLocally()) return;
    } catch {
      return;
    }
    const onScroll = () => {
      const el = document.getElementById(id);
      if (!el || el.getBoundingClientRect().bottom > 0) return;
      window.removeEventListener("scroll", onScroll);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* ignore */
      }
      open();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [id, open]);
  return null;
}

type Fields = "fullName" | "email" | "phone";
const fields: { name: Fields; label: string; type: string; autoComplete: string }[] = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
];

function LeadDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const send = useServerFn(submitLead);
  const [values, setValues] = useState<Record<Fields, string>>({ fullName: "", email: "", phone: "" });
  const [smsConsent, setSmsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Fields, string>>>({});
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = leadSchema.safeParse({ ...values, smsConsent, marketingConsent });
    if (!parsed.success) {
      const next: Partial<Record<Fields, string>> = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as Fields] ??= issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);
    saveLeadLocally(parsed.data);
    // Save the lead, but never keep the visitor waiting more than ~2.5s for the CRM.
    await Promise.race([send({ data: parsed.data }).catch(() => undefined), new Promise((r) => setTimeout(r, 2500))]);
    setBusy(false);
    onOpenChange(false);
    navigate({ to: "/book" });
  }

  return (
    <Z2Dialog open={open} onOpenChange={onOpenChange} title="Book your free demo call">
      <div className="pr-8">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-claret-soft">
          <span>Step 1 of 2</span>
          <span>50%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-bone-deep">
          <div className="h-full w-1/2 rounded-full bg-lime" />
        </div>
      </div>

      <h2 className="mt-6 text-3xl font-bold leading-tight">
        Where can we <span className="text-serif-accent">reach you?</span>
      </h2>

      <p className="mt-3 flex items-center gap-2 rounded-xl border border-[#F2C15A] bg-[#FFF1D0] px-3 py-2 text-sm font-semibold text-[#7A4B00]">
        <AlertTriangle className="size-4 shrink-0" /> Only accepting 3 new clients this month
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            <Label htmlFor={`lead-${f.name}`} className="text-claret">
              {f.label}
            </Label>
            <Input
              id={`lead-${f.name}`}
              type={f.type}
              autoComplete={f.autoComplete}
              value={values[f.name]}
              onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.value }))}
              aria-invalid={!!errors[f.name]}
              className="mt-1.5 h-12 rounded-xl bg-background"
            />
            {errors[f.name] && <p className="mt-1 text-sm text-destructive">{errors[f.name]}</p>}
          </div>
        ))}

        <Consent id="lead-sms" checked={smsConsent} onChange={setSmsConsent}>
          Text me about my booking from Z2 Agents.
        </Consent>
        <Consent id="lead-marketing" checked={marketingConsent} onChange={setMarketingConsent}>
          Send me occasional offers from Z2 Agents.
        </Consent>

        <Button type="submit" variant="claret" size="xl" className="w-full" disabled={busy}>
          {busy ? "One moment…" : "Continue to pick a time"} <ArrowRight />
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          You'll speak with Muhammad Huzaifah Ahmed, the founder, not a sales rep.
        </p>
      </form>
    </Z2Dialog>
  );
}

function Consent({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-bone-deep/60 p-3">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5 size-5" />
      <Label htmlFor={id} className="block cursor-pointer text-xs font-normal leading-relaxed text-claret">
        {children} <span className="text-muted-foreground">{SMS_DISCLOSURE}</span>
      </Label>
    </div>
  );
}
