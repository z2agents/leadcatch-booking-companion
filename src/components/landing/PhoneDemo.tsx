import { useEffect, useState } from "react";
import { CalendarCheck, Check, Phone, PhoneIncoming, Sparkles } from "lucide-react";

/** iOS-style status bar glyphs: cellular bars, Wi-Fi fan and battery with the percentage inside. */
function IosStatusIcons({ battery = 87 }: { battery?: number }) {
  const fill = (21 * battery) / 100;
  return (
    <span className="flex items-center gap-[5px]" aria-hidden>
      <svg viewBox="0 0 18 12" className="h-[11px] w-auto" fill="currentColor">
        <rect x="0" y="7.8" width="3.2" height="4.2" rx="1" />
        <rect x="4.7" y="5.4" width="3.2" height="6.6" rx="1" />
        <rect x="9.4" y="3" width="3.2" height="9" rx="1" />
        <rect x="14.1" y="0.6" width="3.2" height="11.4" rx="1" />
      </svg>
      <svg viewBox="0 0 17 12.5" className="h-[11px] w-auto" fill="currentColor">
        <path d="M0.72 4.02A11 11 0 0 1 16.28 4.02L14.58 5.72A8.6 8.6 0 0 0 2.42 5.72Z" />
        <path d="M3.27 6.57A7.4 7.4 0 0 1 13.73 6.57L12.04 8.26A5 5 0 0 0 4.96 8.26Z" />
        <path d="M5.81 9.11A3.8 3.8 0 0 1 11.19 9.11L8.5 11.8Z" />
      </svg>
      <svg viewBox="0 0 28 13" className="h-[12px] w-auto">
        <rect x="0.5" y="0.5" width="24" height="12" rx="3.8" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="2" y="2" width={fill} height="9" rx="2.4" fill="currentColor" />
        <rect x="25.6" y="4.4" width="1.6" height="4.2" rx="0.8" fill="currentColor" fillOpacity="0.4" />
        <text x="12.5" y="9.6" textAnchor="middle" fontSize="8.4" fontWeight="700" fill="#140a0d" fontFamily="system-ui, -apple-system, sans-serif">
          {battery}
        </text>
      </svg>
    </span>
  );
}

type Line = { who: "ai" | "caller"; text: string };

const script: Line[] = [
  { who: "ai", text: "Luxe Hair Studio — how can I help?" },
  { who: "caller", text: "Anything Thursday for balayage?" },
  { who: "ai", text: "2:30 or 4 PM with Maya?" },
  { who: "caller", text: "4 please." },
  { who: "ai", text: "Booked ✓ Thu 4 PM. Text sent." },
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
    <div className="relative mx-auto w-full max-w-[316px]">
      {/* glow */}
      <div className="absolute -inset-10 rounded-full bg-lime/10 blur-3xl" />

      {/* phone: iPhone-style titanium frame */}
      <div className="relative rounded-[3.25rem] bg-gradient-to-b from-[#4a4043] via-[#2a2225] to-[#3a3134] p-[10px] shadow-lift ring-1 ring-white/10">
        {/* side buttons */}
        <span aria-hidden className="absolute -left-[3px] top-[112px] h-7 w-[3px] rounded-l bg-[#3a3134]" />
        <span aria-hidden className="absolute -left-[3px] top-[160px] h-12 w-[3px] rounded-l bg-[#3a3134]" />
        <span aria-hidden className="absolute -left-[3px] top-[222px] h-12 w-[3px] rounded-l bg-[#3a3134]" />
        <span aria-hidden className="absolute -right-[3px] top-[180px] h-20 w-[3px] rounded-r bg-[#3a3134]" />

        <div className="relative h-[612px] overflow-hidden rounded-[2.7rem] bg-ink">
          {/* status bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-7 pt-[14px] text-[13px] font-semibold text-bone">
            <span>9:41</span>
            <IosStatusIcons />
          </div>

          {/* Dynamic Island: expands into a live call activity once the AI picks up */}
          <div
            className={`absolute left-1/2 top-[11px] z-20 flex h-[30px] -translate-x-1/2 items-center justify-between rounded-full bg-black px-2.5 transition-all duration-500 ease-out ${
              ringing ? "w-[104px]" : "w-[168px]"
            }`}
          >
            {!ringing && (
              <>
                <span className="grid size-5 place-items-center rounded-full bg-lime text-claret-deep">
                  <Phone className="size-3" />
                </span>
                <Waveform active={speaking} bars={4} />
              </>
            )}
          </div>

          {/* home indicator */}
          <div className="absolute bottom-2 left-1/2 z-10 h-[5px] w-28 -translate-x-1/2 rounded-full bg-bone/40" />

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
                You're with a client…
              </p>
            </div>
          ) : (
            <div className="flex h-full flex-col px-4 pb-7 pt-14 text-bone">
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
