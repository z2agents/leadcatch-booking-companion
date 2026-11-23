import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";

const rows = [
  { no: "Hire a receptionist", yes: "AI answers 24/7" },
  { no: "Spend more on ads", yes: "Convert leads you have" },
  { no: "Call back hours later", yes: "Reply instantly" },
];

export function Statement() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="text-center text-5xl font-bold leading-[0.95] text-claret md:text-7xl">
            More bookings.
            <br />
            <span className="text-serif-accent">Same team. Same ad spend.</span>
          </h2>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-4xl gap-3">
          {rows.map((r, i) => (
            <Reveal key={r.no} delay={i * 100}>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-muted-foreground line-through decoration-danger/60">
                  <X className="size-5 shrink-0 text-danger" /> {r.no}
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-claret px-5 py-4 font-medium text-bone">
                  <Check className="size-5 shrink-0 text-lime" /> {r.yes}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
