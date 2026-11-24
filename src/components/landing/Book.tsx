import { ArrowRight, CalendarCheck, Check } from "lucide-react";
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

export function Book() {
  return (
    <section id="book" className="grain relative overflow-hidden bg-claret-deep py-16 text-bone md:py-32">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">Free demo call</p>
          <h2 className="mt-4 text-4xl font-bold leading-[0.95] md:text-6xl">
            Stop losing clients <span className="text-serif-accent text-lime">to voicemail.</span>
          </h2>
          <p className="mt-6 max-w-sm text-bone/70">Pick a time. See it live.</p>
          <ul className="mt-8 space-y-3">
            {["30 minutes", "Live AI demo", "Custom plan"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-lime text-claret-deep">
                  <Check className="size-3.5" />
                </span>
                {t}
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
