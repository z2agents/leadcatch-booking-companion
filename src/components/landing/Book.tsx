import { Check } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";
import { Reveal } from "./Reveal";

export function Book() {
  return (
    <section id="book" className="grain relative overflow-hidden bg-claret-deep py-24 text-bone md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">Free demo call</p>
          <h2 className="mt-4 text-5xl font-bold leading-[0.95] md:text-6xl">
            Stop losing clients <span className="text-serif-accent text-lime">to voicemail.</span>
          </h2>
          <p className="mt-6 max-w-sm text-bone/70">Pick a time. We'll show you your AI agent booking real appointments.</p>
          <ul className="mt-8 space-y-3">
            {["30-minute strategy call", "Hear your AI agent live", "Custom plan for your business"].map((t) => (
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
          <div className="overflow-hidden rounded-[2rem] bg-card p-2 shadow-lift">
            <iframe
              src={BOOKING_URL}
              title="Book a free demo call with Z2 Agents"
              loading="lazy"
              className="block h-[800px] w-full rounded-[1.6rem] border-0 bg-card"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
