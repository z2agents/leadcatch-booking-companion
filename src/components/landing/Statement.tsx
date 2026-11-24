import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";

const rows = [
  { no: "Hire a receptionist", yes: "AI answers 24/7" },
  { no: "Spend more on ads", yes: "Convert leads you have" },
  { no: "Call back hours later", yes: "Reply instantly" },
];

export function Statement() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="text-center text-4xl font-bold leading-[0.95] text-claret md:text-7xl">
            More bookings.
            <br />
            <span className="text-serif-accent">Same team. Same ad spend.</span>
          </h2>
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:mt-14">
          {rows.map((r, i) => (
            <Reveal key={r.no} delay={i * 100}>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-3 text-sm text-muted-foreground md:gap-3 md:px-5 md:py-4 md:text-base line-through decoration-danger/60">
                  <X className="size-4 shrink-0 text-danger md:size-5" /> {r.no}
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-claret px-3 py-3 text-sm font-medium text-bone md:gap-3 md:px-5 md:py-4 md:text-base">
                  <Check className="size-4 shrink-0 text-lime md:size-5" /> {r.yes}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
