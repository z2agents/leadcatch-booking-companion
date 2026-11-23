import type { ReactNode } from "react";
import { Reveal } from "@/components/landing/Reveal";
import { BenefitList } from "./BenefitList";
import { BookingCalendar } from "./BookingCalendar";
import { PageShell } from "./PageShell";

/** Shared layout for /book and /book-demo. */
export function BookingPage({ above }: { above?: ReactNode }) {
  return (
    <PageShell>
      <section className="grain relative overflow-hidden bg-hero text-bone">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-32 md:pt-40 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-bone/15 bg-bone/5 px-3 py-1.5 text-xs font-medium text-bone/80">
              <span className="size-1.5 animate-blink rounded-full bg-lime" />
              Free demo call
            </span>
            <h1 className="mt-6 animate-rise text-5xl font-bold leading-[0.95] [animation-delay:80ms] md:text-6xl">
              See it book <span className="text-serif-accent text-lime">a real call.</span>
            </h1>
            <p className="mt-5 max-w-sm animate-rise text-lg text-bone/70 [animation-delay:160ms]">Pick a time. See it live.</p>
            <div className="mt-8 animate-rise [animation-delay:240ms]">
              <BenefitList />
            </div>
          </div>
          <div className="space-y-6">
            {above && <Reveal>{above}</Reveal>}
            <Reveal delay={150}>
              <BookingCalendar />
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
