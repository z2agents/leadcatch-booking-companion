import { useEffect, useState } from "react";
import { CalendarCheck, Check, Phone, PhoneIncoming, Sparkles } from "lucide-react";

type Line = { who: "ai" | "caller"; text: string };

const script: Line[] = [
  { who: "ai", text: "Hi, thanks for calling Luxe Hair Studio! How can I help?" },
  { who: "caller", text: "Do you have anything Thursday for a balayage?" },
  { who: "ai", text: "Yes! 2:30 or 4:00 PM with Maya — which works?" },
  { who: "caller", text: "4 please." },
  { who: "ai", text: "Booked ✓ Thu 4:00 PM. I've texted you a confirmation." },
];

// step 0 = ringing, 1..5 = lines, 6 = booking card
const durations = [1800, 1700, 1700, 1700, 1200, 1600, 3600];

export function PhoneDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => clearTimeout(t);
  }, [step]);

  const ringing = step === 0;
  const visible = script.slice(0, Math.max(0, step));
  const speaking = !ringing && step <= script.length && visible.at(-1)?.who === "ai";
  const booked = step >= 6;

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* glow */}
      <div className="absolute -inset-10 rounded-full bg-lime/10 blur-3xl" />

      {/* phone */}
      <div className="relative rounded-[2.75rem] border border-bone/15 bg-claret-deep p-3 shadow-lift">
        <div className="relative h-[560px] overflow-hidden rounded-[2.2rem] bg-ink">
          <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-claret-deep" />

          {ringing ? (
            <div className="flex h-full flex-col items-center justify-center gap-5 text-bone">
              <div className="relative grid size-24 place-items-center">
                <span className="absolute inset-0 animate-ring rounded-full bg-lime/40" />
                <span className="absolute inset-0 animate-ring rounded-full bg-lime/30 [animation-delay:0.6s]" />
                <span className="relative grid size-20 place-items-center rounded-full bg-lime text-claret-deep">
                  <PhoneIncoming className="size-8 animate-shake" />
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-bone/50">Incoming call</p>
                <p className="mt-1 font-display text-2xl font-semibold">New client</p>
                <p className="text-sm text-bone/60">(555) 018-2234</p>
              </div>
              <p className="mt-6 rounded-full bg-bone/10 px-4 py-2 text-xs text-bone/70">
                You're mid-appointment…
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col px-4 pb-5 pt-12 text-bone">
              <div className="flex items-center gap-3 rounded-2xl bg-bone/5 p-3">
                <span className="grid size-10 place-items-center rounded-full bg-lime text-claret-deep">
                  <Sparkles className="size-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Z2 AI Receptionist</p>
                  <p className="flex items-center gap-1.5 text-xs text-lime">
                    <span className="size-1.5 animate-blink rounded-full bg-lime" /> Live call
                  </p>
                </div>
                <Waveform active={speaking} />
              </div>

              <div className="mt-4 flex flex-1 flex-col justify-end gap-2.5">
                {visible.map((l, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] animate-rise rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                      l.who === "ai"
                        ? "self-start rounded-bl-md bg-bone/10"
                        : "self-end rounded-br-md bg-lime text-claret-deep"
                    }`}
                  >
                    {l.text}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <span className="grid size-12 place-items-center rounded-full bg-danger text-bone">
                  <Phone className="size-5 rotate-[135deg]" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* floating chips */}
      {!ringing && (
        <div className="absolute -left-6 top-24 animate-pop rounded-2xl bg-bone px-3.5 py-2.5 text-claret shadow-lift sm:-left-16">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Answered in</p>
          <p className="font-display text-xl font-bold">0.8s</p>
        </div>
      )}
      {booked && (
        <div className="absolute -right-4 bottom-28 w-56 animate-pop rounded-2xl bg-bone p-4 text-claret shadow-lift sm:-right-20">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="grid size-6 place-items-center rounded-full bg-lime text-claret-deep">
              <Check className="size-3.5" />
            </span>
            New booking
          </div>
          <p className="mt-2 font-display text-lg font-bold leading-tight">Balayage · Thu 4:00 PM</p>
          <p className="text-xs text-muted-foreground">with Maya · $180</p>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-bone-deep px-2 py-1.5 text-[11px] font-medium">
            <CalendarCheck className="size-3.5" /> Synced to Google Calendar
          </div>
        </div>
      )}
    </div>
  );
}

export function Waveform({ active = true, bars = 5 }: { active?: boolean; bars?: number }) {
  return (
    <div className="flex h-6 items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`h-full w-[3px] origin-center rounded-full bg-lime ${active ? "animate-wave" : "scale-y-[0.3]"}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}
