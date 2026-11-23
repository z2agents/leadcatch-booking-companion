import { CalendarCheck, PhoneCall, TrendingUp, Sparkles, LayoutDashboard, CalendarDays, Users, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const kpis = [
  { i: PhoneCall, l: "Calls answered", v: "186", d: "+100%" },
  { i: CalendarCheck, l: "Booked by AI", v: "42", d: "+31%" },
  { i: TrendingUp, l: "Revenue booked", v: "$8,420", d: "+24%" },
];

const feed = [
  { n: "Priya S.", s: "Balayage · Thu 4 PM", c: "Call" },
  { n: "Marcus T.", s: "Fade · Fri 11 AM", c: "WhatsApp" },
  { n: "Elena R.", s: "Facial · Sat 2 PM", c: "Instagram" },
];

const slots = [
  { d: 0, t: 10, h: 18, l: "Facial" },
  { d: 0, t: 50, h: 22, l: "Colour" },
  { d: 1, t: 25, h: 20, l: "Cut" },
  { d: 2, t: 5, h: 15, l: "Brows" },
  { d: 2, t: 45, h: 30, l: "Massage" },
  { d: 3, t: 62, h: 22, l: "Balayage", hot: true },
  { d: 4, t: 18, h: 25, l: "Nails" },
  { d: 4, t: 60, h: 18, l: "Fade", hot: true },
];

export function Portal() {
  return (
    <section id="portal" className="grain relative overflow-hidden bg-hero py-24 text-bone md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="grid items-end gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime">Your portal</p>
            <h2 className="mt-4 text-5xl font-bold leading-[0.95] md:text-7xl">
              Glance. <span className="text-serif-accent text-lime">Done.</span>
            </h2>
          </div>
          <p className="max-w-sm text-bone/70 md:justify-self-end">
            Your week, booked while you worked.
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-14">
          <div className="overflow-hidden rounded-[2rem] border border-bone/10 bg-claret-deep shadow-lift">
            <div className="flex">
              {/* sidebar */}
              <aside className="hidden w-16 flex-col items-center gap-5 border-r border-bone/10 py-6 sm:flex">
                <span className="grid size-9 place-items-center rounded-xl bg-lime text-xs font-extrabold text-claret-deep">Z2</span>
                {[LayoutDashboard, CalendarDays, Users, MessageCircle].map((I, k) => (
                  <I key={k} className={`size-5 ${k === 0 ? "text-lime" : "text-bone/40"}`} />
                ))}
              </aside>

              <div className="flex-1 p-5 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-xl font-semibold">Good morning, Maya 👋</p>
                  <span className="flex items-center gap-2 rounded-full bg-bone/10 px-3 py-1.5 text-xs">
                    <span className="size-1.5 animate-blink rounded-full bg-lime" /> Google Calendar synced
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {kpis.map(({ i: I, l, v, d }) => (
                    <div key={l} className="rounded-2xl bg-bone/5 p-4">
                      <div className="flex items-center justify-between text-xs text-bone/60">
                        <span className="flex items-center gap-1.5"><I className="size-3.5" /> {l}</span>
                        <span className="rounded-full bg-lime/15 px-2 py-0.5 text-lime">{d}</span>
                      </div>
                      <p className="mt-2 font-display text-3xl font-bold">{v}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                  <div className="rounded-2xl bg-bone/5 p-4">
                    <div className="grid grid-cols-5 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, di) => (
                        <div key={d}>
                          <p className="mb-2 text-center text-[11px] text-bone/50">{d}</p>
                          <div className="relative h-52 rounded-xl bg-bone/5">
                            {slots.filter((s) => s.d === di).map((s) => (
                              <div
                                key={s.l}
                                className={`absolute inset-x-1 rounded-lg px-1.5 py-1 text-[10px] font-semibold ${
                                  s.hot ? "bg-lime text-claret-deep shadow-glow" : "bg-claret-soft text-bone"
                                }`}
                                style={{ top: `${s.t}%`, height: `${s.h}%` }}
                              >
                                {s.l}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-bone/5 p-4">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles className="size-4 text-lime" /> Booked by your AI
                    </p>
                    <div className="space-y-2">
                      {feed.map((f, k) => (
                        <div key={f.n} className="flex items-center gap-3 rounded-xl bg-bone/5 p-3 animate-rise" style={{ animationDelay: `${k * 0.15}s` }}>
                          <span className="grid size-9 place-items-center rounded-full bg-claret-soft text-xs font-semibold">
                            {f.n.split(" ").map((p) => p[0]).join("")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{f.n}</p>
                            <p className="truncate text-xs text-bone/55">{f.s}</p>
                          </div>
                          <span className="rounded-full bg-lime/15 px-2 py-0.5 text-[10px] text-lime">{f.c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
