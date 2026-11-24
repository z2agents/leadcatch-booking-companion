import { ArrowRight, CalendarCheck, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadFlow } from "@/components/site/LeadFlow";
import { Reveal } from "./Reveal";

/** The homepage no longer embeds the calendar: it starts the 2-step booking flow instead. */
function BookCta() {
  const { open } = useLeadFlow();
  return (
    <div className="flex h-full flex-col justify-center rounded-[2rem] bg-card p-6 text-claret shadow-lift md:p-10">
      <span className="grid size-14 place-items-center rounded-2xl bg-lime text-claret-deep">
        <CalendarCheck className="size-7" />
      </span>
      <h3 className="mt-6 text-2xl font-bold leading-tight md:text-4xl">
        Two quick steps. <span className="text-serif-accent">Then it's booked.</span>
      </h3>
      <ol className="mt-6 space-y-3 text-claret/80">
        <li className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-claret text-xs font-bold text-lime">1</span>
          Tell us where to reach you
        </li>
        <li className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-claret text-xs font-bold text-lime">2</span>
          Pick a time that suits you
        </li>
      </ol>
      <Button variant="claret" size="xl" className="mt-8 w-full sm:w-fit" onClick={open}>
        Book a free demo call <ArrowRight />
      </Button>
    </div>
  );
}

const rows = [
  { no: "Hire a receptionist", yes: "AI answers 24/7" },
  { no: "Spend more on ads", yes: "Convert leads you have" },
  { no: "Call back hours later", yes: "Reply instantly" },
];

/** The pitch ("more bookings, same team") and the demo-call CTA, merged into one closing section. */
export function Book() {
  return (
    <section id="book" className="grain relative overflow-hidden bg-claret-deep py-16 text-bone md:py-32">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">Free demo call</p>
          <h2 className="mt-4 text-4xl font-bold leading-[0.95] md:text-6xl">
            More bookings. <span className="text-serif-accent text-lime">Same team. Same ad spend.</span>
          </h2>
          <div className="mt-8 grid gap-2.5">
            {rows.map((r) => (
              <div key={r.no} className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-2xl border border-bone/10 px-3 py-3 text-sm text-bone/50 line-through decoration-danger/70 md:px-4">
                  <X className="size-4 shrink-0 text-danger" /> {r.no}
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-bone/10 px-3 py-3 text-sm font-medium md:px-4">
                  <Check className="size-4 shrink-0 text-lime" /> {r.yes}
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {["30 minutes", "Live AI demo", "Custom plan"].map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-full bg-lime/15 px-3 py-1.5 text-lime">
                <Check className="size-3.5" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <BookCta />
        </Reveal>
      </div>
    </section>
  );
}
