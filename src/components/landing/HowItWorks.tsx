import type { ReactNode } from "react";
import { CalendarCheck, Instagram, MessageCircle, Phone, Globe, Sparkles, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { Waveform } from "./PhoneDemo";

export function HowItWorks() {
  return (
    <section id="how" className="grain relative overflow-hidden bg-claret-deep py-24 text-bone md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">How it works</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-5xl font-bold leading-[0.95] md:text-6xl">
            Ring. Talk. <span className="text-serif-accent text-lime">Booked.</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* connector */}
          <svg className="absolute left-0 top-1/2 hidden h-2 w-full -translate-y-1/2 md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden>
            <line x1="5" y1="1" x2="95" y2="1" stroke="var(--lime)" strokeWidth="0.4" strokeDasharray="2 2" className="animate-flow" />
          </svg>

          <Reveal delay={0}>
            <Step n="01" title="A client reaches out">
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { i: Phone, l: "Call" },
                  { i: MessageCircle, l: "WhatsApp" },
                  { i: Instagram, l: "Instagram" },
                  { i: Globe, l: "Website" },
                ].map(({ i: I, l }, k) => (
                  <div key={l} className="flex animate-float items-center gap-2 rounded-xl bg-bone/8 px-3 py-2.5 text-sm" style={{ animationDelay: `${k * 0.4}s` }}>
                    <I className="size-4 text-lime" /> {l}
                  </div>
                ))}
              </div>
            </Step>
          </Reveal>

          <Reveal delay={150}>
            <Step n="02" title="Your AI talks & books">
              <div className="flex items-center gap-3 rounded-2xl bg-bone/8 p-4">
                <span className="grid size-11 place-items-center rounded-full bg-lime text-claret-deep">
                  <Sparkles className="size-5" />
                </span>
                <Waveform bars={14} />
              </div>
              <p className="mt-3 rounded-2xl rounded-bl-md bg-bone/8 px-3.5 py-2.5 text-sm text-bone/80">
                "I have 4 PM Thursday — shall I lock it in?"
              </p>
            </Step>
          </Reveal>

          <Reveal delay={300}>
            <Step n="03" title="It lands in your calendar">
              <div className="space-y-2">
                {[
                  { t: "10:00", n: "Sarah · Facial" },
                  { t: "13:30", n: "James · Fade" },
                  { t: "16:00", n: "Priya · Balayage", fresh: true },
                ].map((a) => (
                  <div
                    key={a.t}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm ${
                      a.fresh ? "bg-lime font-semibold text-claret-deep shadow-glow" : "bg-bone/8"
                    }`}
                  >
                    <span>
                      <span className="mr-2 opacity-60">{a.t}</span>
                      {a.n}
                    </span>
                    {a.fresh ? <Check className="size-4" /> : <CalendarCheck className="size-4 opacity-50" />}
                  </div>
                ))}
              </div>
            </Step>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="relative h-full rounded-3xl border border-bone/10 bg-claret p-6 shadow-lift">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="font-display text-sm text-lime">{n}</span>
      </div>
      {children}
    </div>
  );
}
