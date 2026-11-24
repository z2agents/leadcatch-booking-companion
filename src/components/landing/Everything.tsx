import type { ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  Facebook,
  Instagram,
  MessageCircle,
  MessageSquareText,
  Phone,
  PhoneMissed,
  Send,
  Sparkles,
  Workflow,
  Globe,
  MousePointerClick,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Waveform } from "./PhoneDemo";

export function Everything() {
  return (
    <section id="everything" className="relative py-16 md:py-32">
      <div className="dot-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-claret-soft">What you get</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[0.95] text-claret md:text-6xl">
            One platform. <span className="text-serif-accent">One login.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">Calls, chats, calendar, CRM — all connected.</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:auto-rows-[minmax(220px,auto)] md:grid-cols-6 md:gap-4">
          {/* AI calling */}
          <Tile className="col-span-2 md:col-span-4" dark icon={Phone} title="AI calling agent" sub="Answers & books, 24/7.">
            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-bone/8 p-4">
              <span className="relative grid size-12 place-items-center rounded-full bg-lime text-claret-deep">
                <span className="absolute inset-0 animate-ring rounded-full bg-lime/50" />
                <Phone className="relative size-5" />
              </span>
              <Waveform bars={28} />
              <span className="ml-auto hidden rounded-full bg-lime/15 px-3 py-1 text-xs text-lime sm:block">24/7</span>
            </div>
          </Tile>

          {/* Missed call text back */}
          <Tile compact className="md:col-span-2" icon={PhoneMissed} title="Missed-call text-back" sub="Texts back in seconds.">
            <div className="mt-5 space-y-2 text-[13px]">
              <div className="flex items-center gap-2 text-xs text-danger">
                <PhoneMissed className="size-3.5" /> Missed call · 2:14 PM
              </div>
              <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-claret px-3 py-2 text-bone">
                Sorry we missed you! Book a time? 📅
              </p>
              <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-lime px-3 py-2 text-claret-deep">Friday works!</p>
            </div>
          </Tile>

          {/* Chat agents */}
          <Tile compact className="md:col-span-2" icon={MessageCircle} title="AI chat agents" sub="WhatsApp, Instagram, Facebook, web.">
            <div className="mt-6 flex justify-between">
              {[MessageCircle, Instagram, Facebook, Globe].map((I, k) => (
                <span key={k} className="grid size-12 animate-float place-items-center rounded-2xl bg-claret text-lime shadow-lift" style={{ animationDelay: `${k * 0.3}s` }}>
                  <I className="size-5" />
                </span>
              ))}
            </div>
          </Tile>

          {/* Calendar */}
          <Tile className="col-span-2 md:col-span-4 md:row-span-2" icon={CalendarDays} title="Calendar & booking" sub="Synced with Google Calendar.">
            <MiniCalendar />
          </Tile>

          {/* Website */}
          <Tile compact className="md:col-span-2" dark icon={Globe} title="Hosted website" sub="Your AI built in.">
            <div className="mt-5 overflow-hidden rounded-xl border border-bone/10 bg-ink">
              <div className="flex gap-1 border-b border-bone/10 px-2.5 py-2">
                {[0, 1, 2].map((k) => <span key={k} className="size-2 rounded-full bg-bone/25" />)}
              </div>
              <div className="relative p-3">
                <div className="h-2.5 w-2/3 rounded bg-bone/30" />
                <div className="mt-2 h-2 w-1/2 rounded bg-bone/15" />
                <div className="mt-3 h-5 w-20 rounded-full bg-lime" />
                <span className="absolute bottom-2 right-2 grid size-8 animate-float place-items-center rounded-full bg-lime text-claret-deep">
                  <Sparkles className="size-4" />
                </span>
              </div>
            </div>
          </Tile>

          {/* Widgets */}
          <Tile compact className="md:col-span-2" icon={MousePointerClick} title="Website widgets" sub="Chat + booking on your site.">
            <div className="mt-5 flex items-end justify-end gap-2">
              <span className="rounded-2xl rounded-br-md bg-card px-3 py-2 text-xs shadow-lift">Need a booking? 👋</span>
              <span className="grid size-11 place-items-center rounded-full bg-claret text-lime shadow-lift">
                <MessageSquareText className="size-5" />
              </span>
            </div>
          </Tile>

          {/* CRM */}
          <Tile compact className="md:col-span-2" icon={Users} title="CRM & pipeline" sub="Every lead, tracked.">
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { h: "New", n: 3 },
                { h: "Booked", n: 2 },
                { h: "Won", n: 1 },
              ].map((c, k) => (
                <div key={c.h} className="rounded-xl bg-bone-deep p-2">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{c.h}</p>
                  {Array.from({ length: c.n }).map((_, j) => (
                    <div key={j} className={`mb-1.5 h-5 rounded-md ${k === 2 ? "bg-lime" : "bg-card"}`} />
                  ))}
                </div>
              ))}
            </div>
          </Tile>

          {/* Automations */}
          <Tile compact className="md:col-span-2" dark icon={Workflow} title="Automations" sub="Confirm, remind, follow up.">
            <div className="mt-6 flex items-center justify-between gap-1">
              {[
                { i: Check, l: "Confirm" },
                { i: Bell, l: "Remind" },
                { i: Send, l: "Follow up" },
                { i: PhoneMissed, l: "No-show" },
              ].map(({ i: I, l }, k, arr) => (
                <div key={l} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="grid size-10 place-items-center rounded-full bg-lime text-claret-deep">
                      <I className="size-4" />
                    </span>
                    <span className="text-[11px] text-bone/70">{l}</span>
                  </div>
                  {k < arr.length - 1 && <span className="mx-1 mb-5 h-px flex-1 border-t border-dashed border-lime/50" />}
                </div>
              ))}
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}

function Tile({
  className = "",
  dark,
  icon: Icon,
  title,
  sub,
  horizontal,
  compact,
  children,
}: {
  className?: string;
  dark?: boolean;
  icon: typeof Phone;
  title: string;
  sub: string;
  horizontal?: boolean;
  /** Half-width on phones: show icon, title and line only; the mini visual returns from `sm`. */
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal className={className}>
      <div
        className={`group h-full rounded-3xl p-4 transition-all sm:p-6 duration-500 hover:-translate-y-1 hover:shadow-lift ${
          dark ? "bg-claret text-bone" : "border border-border bg-card text-claret"
        } ${horizontal ? "flex flex-col gap-6 md:flex-row md:items-center" : ""}`}
      >
        <div className={horizontal ? "md:w-72" : ""}>
          <span className={`grid size-10 place-items-center rounded-xl ${dark ? "bg-bone/10 text-lime" : "bg-claret text-lime"}`}>
            <Icon className="size-5" />
          </span>
          <h3 className="mt-4 text-base font-semibold sm:text-xl">{title}</h3>
          <p className={`mt-1 text-sm ${dark ? "text-bone/60" : "text-muted-foreground"}`}>{sub}</p>
        </div>
        <div className={compact ? "hidden sm:contents" : "contents"}>{children}</div>
      </div>
    </Reveal>
  );
}

function MiniCalendar() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const events: Record<string, { top: number; h: number; label: string; hot?: boolean }[]> = {
    Mon: [{ top: 8, h: 22, label: "Facial" }, { top: 52, h: 18, label: "Brows" }],
    Tue: [{ top: 20, h: 30, label: "Colour" }],
    Wed: [{ top: 4, h: 18, label: "Fade" }, { top: 40, h: 24, label: "Massage" }, { top: 72, h: 16, label: "Nails" }],
    Thu: [{ top: 14, h: 20, label: "Cut" }, { top: 60, h: 26, label: "Balayage", hot: true }],
    Fri: [{ top: 30, h: 28, label: "Consult" }],
  };
  return (
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="font-semibold">This week</span>
        <span className="flex items-center gap-1.5 rounded-full bg-bone-deep px-2.5 py-1 font-medium">
          <span className="size-1.5 animate-blink rounded-full bg-lime-deep" /> Google Calendar synced
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {days.map((d, di) => (
          <div key={d} className={di < 2 ? "hidden sm:block" : ""}>
            <p className="mb-2 text-center text-xs font-medium text-muted-foreground sm:text-[11px]">{d}</p>
            <div className="relative h-40 rounded-xl bg-bone-deep/60 sm:h-56">
              {(events[d] ?? []).map((e) => (
                <div
                  key={e.label}
                  className={`absolute inset-x-1 rounded-lg px-1.5 py-1 text-xs font-semibold sm:text-[10px] ${
                    e.hot ? "animate-pop bg-lime text-claret-deep shadow-glow" : "bg-claret text-bone"
                  }`}
                  style={{ top: `${e.top}%`, height: `${e.h}%` }}
                >
                  {e.label}
                  {e.hot && <span className="block font-normal opacity-70">AI booked</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
