import { useState } from "react";
import { PhoneMissed, Voicemail, UserX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { monthlyLeak } from "@/lib/site";
import { useLeadFlow } from "@/components/site/LeadFlow";
import salon from "@/assets/busy-salon.jpg";
import spa from "@/assets/busy-spa.jpg";
import contractor from "@/assets/busy-contractor.jpg";
import { Reveal } from "./Reveal";

const scenes = [
  { img: salon, alt: "Hairstylist cutting hair while her phone rings unanswered", tag: "Mid-cut", missed: 3 },
  { img: spa, alt: "Spa therapist giving a facial while a call is missed", tag: "Mid-facial", missed: 2 },
  { img: contractor, alt: "Contractor drilling on site while his phone rings", tag: "On the job", missed: 5 },
];

const stats = [
  { n: "62%", t: "of calls go unanswered" },
  { n: "85%", t: "never call back" },
  { n: "78%", t: "book whoever replies first" },
];

const timeline = [
  { icon: PhoneMissed, t: "0s", l: "Phone rings." },
  { icon: Voicemail, t: "20s", l: "Voicemail." },
  { icon: UserX, t: "2 min", l: "They book elsewhere." },
];

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function Leak() {
  const { open: openLead } = useLeadFlow();
  const [calls, setCalls] = useState(25);
  const [value, setValue] = useState(200);
  const loss = monthlyLeak(calls, value);

  return (
    <section id="leak" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-claret-soft">The silent leak</p>
          <h2 className="mt-4 max-w-4xl text-5xl font-bold leading-[0.95] text-claret md:text-7xl">
            Your business is leaking <span className="mark-lime">$10K</span> every month from{" "}
            <span className="text-serif-accent">slow follow-up.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {scenes.map((s, i) => (
            <Reveal key={s.tag} delay={i * 120}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  width={1122}
                  height={1402}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-claret-deep/90 via-claret-deep/10 to-transparent" />
                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-danger px-3 py-1 text-xs font-semibold text-bone">
                  <PhoneMissed className="size-3.5" /> {s.missed} missed
                </span>
                <figcaption className="absolute bottom-5 left-5 font-display text-3xl font-bold text-bone">
                  {s.tag}.
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* timeline */}
        <Reveal className="mt-6">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-3">
            {timeline.map(({ icon: Icon, t, l }, i) => (
              <div key={t} className="flex items-center gap-4 bg-card p-6">
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl ${
                    i === 2 ? "bg-danger text-bone" : "bg-bone-deep text-claret"
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold text-claret">{t}</p>
                  <p className="text-sm text-muted-foreground">{l}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div className="grid gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="flex items-baseline gap-5 border-b border-border pb-6">
                  <span className="font-display text-6xl font-bold text-claret md:text-7xl">{s.n}</span>
                  <span className="max-w-[14rem] text-muted-foreground">{s.t}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="grain rounded-[2rem] bg-claret p-8 text-bone shadow-lift md:p-10">
              <p className="text-sm uppercase tracking-[0.2em] text-bone/60">Your monthly leak</p>
              <p className="mt-3 font-display text-6xl font-bold text-lime tabular-nums md:text-7xl">
                {money(loss)}
                <span className="text-2xl text-bone/60">/mo</span>
              </p>

              <div className="mt-8 space-y-7">
                <div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-bone/70">Missed calls / week</span>
                    <span className="font-semibold">{calls}</span>
                  </div>
                  <Slider
                    value={[calls]}
                    min={1}
                    max={80}
                    step={1}
                    onValueChange={(v) => setCalls(v[0] ?? calls)}
                    aria-label="Missed calls per week"
                  />
                </div>
                <div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-bone/70">Avg. booking value</span>
                    <span className="font-semibold">{money(value)}</span>
                  </div>
                  <Slider
                    value={[value]}
                    min={20}
                    max={1000}
                    step={10}
                    onValueChange={(v) => setValue(v[0] ?? value)}
                    aria-label="Average booking value"
                  />
                </div>
              </div>
              <p className="mt-6 text-xs text-bone/50">Assumes 50% would book.</p>
              <Button variant="lime" size="xl" className="mt-6 w-full" onClick={openLead}>
                Plug the leak
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
