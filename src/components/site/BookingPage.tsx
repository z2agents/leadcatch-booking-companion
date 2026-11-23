import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, CalendarClock, UserRound } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { Button } from "@/components/ui/button";
import { BenefitList } from "./BenefitList";
import { BookingCalendar } from "./BookingCalendar";
import { Z2Dialog } from "./LeadFlow";
import { PageShell } from "./PageShell";

/** The "real person, limited slots" notes shown beside the calendar. */
function BookingNotes() {
  return (
    <div className="space-y-3 text-sm">
      <p className="flex items-start gap-2.5 rounded-2xl border border-danger/40 bg-danger/15 px-4 py-3 text-bone">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#FF9C8F]" />
        <span>
          <strong className="font-semibold">This is a real call with a real person.</strong> Can't make it? Please reschedule
          so someone else can have the slot.
        </span>
      </p>
      <p className="flex items-start gap-2.5 rounded-2xl border border-[#F5B83D]/40 bg-[#F5B83D]/15 px-4 py-3 text-[#FFE2A3]">
        <CalendarClock className="mt-0.5 size-4 shrink-0" />
        <span>No times showing? This week is full. Check next week.</span>
      </p>
      <p className="flex items-center gap-2.5 px-1 text-bone/70">
        <UserRound className="size-4 shrink-0 text-lime" />
        You'll speak with Muhammad Huzaifah Ahmed, the founder, not a sales rep.
      </p>
    </div>
  );
}

/** Marks the pop-up as used for this visit. Returns false if it was already shown. */
function claimExitPopup() {
  try {
    if (sessionStorage.getItem("z2_exit_shown")) return false;
    sessionStorage.setItem("z2_exit_shown", "1");
  } catch {
    /* storage blocked: still show it once for this page view */
  }
  return true;
}

/**
 * Shows once per visit, before a time is picked:
 * - computer: when the mouse heads for the browser bar (after 4s on the page);
 * - phone: when the calendar has been on screen for 5s and the visitor still hasn't tapped into it.
 *   (We can't see inside GHL's calendar, so "hasn't tapped into it" stands in for "fields not filled".)
 */
function ExitIntent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isPhone = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let engaged = false;
    let observer: IntersectionObserver | undefined;

    const show = () => {
      if (engaged || !claimExitPopup()) return;
      setOpen(true);
    };

    // Tapping into the calendar moves focus into its frame, which blurs this window.
    const onBlur = () => {
      if (document.activeElement?.tagName === "IFRAME") {
        engaged = true;
        if (timer) clearTimeout(timer);
      }
    };

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      document.removeEventListener("mouseout", onLeave);
      show();
    };

    if (isPhone) {
      window.addEventListener("blur", onBlur);
      const cal = document.getElementById("calendar");
      if (cal) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting && !engaged && !timer) {
              timer = setTimeout(show, 5000);
              observer?.disconnect();
            }
          },
          { threshold: 0.3 },
        );
        observer.observe(cal);
      }
    } else {
      timer = setTimeout(() => document.addEventListener("mouseout", onLeave), 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
      observer?.disconnect();
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <Z2Dialog open={open} onOpenChange={setOpen} title="Your slot isn't booked yet">
      <p className="w-fit rounded-full bg-lime px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-claret-deep">
        Last step
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-tight">
        Wait, your slot <span className="text-serif-accent">isn't booked yet.</span>
      </h2>
      <p className="mt-4 flex items-start gap-2.5 rounded-2xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-danger" />
        This is a real call with a real person. Pick a time that works so the slot is yours.
      </p>
      <Button
        variant="claret"
        size="xl"
        className="mt-6 w-full"
        onClick={() => {
          setOpen(false);
          document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      >
        Pick my time
      </Button>
    </Z2Dialog>
  );
}

/** Shared layout for /book and /book-demo (step 2 of the booking flow). */
export function BookingPage({ above }: { above?: ReactNode }) {
  return (
    <PageShell>
      <section className="grain relative overflow-hidden bg-hero text-bone">
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-32 md:pt-40 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="max-w-sm animate-rise">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-bone/60">
                <span>Step 2 of 2 · Last step</span>
                <span>100%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-bone/10">
                <div className="z2-progress h-full w-full origin-left rounded-full bg-lime" />
              </div>
            </div>
            <h1 className="mt-8 animate-rise text-5xl font-bold leading-[0.95] [animation-delay:80ms] md:text-6xl">
              Pick your time <span className="text-serif-accent text-lime">below.</span>
            </h1>
            <p className="mt-5 max-w-sm animate-rise text-lg text-bone/70 [animation-delay:160ms]">See it book a real call, live.</p>
            <div className="mt-8 animate-rise [animation-delay:240ms]">
              <BenefitList />
            </div>
            <div className="mt-8 max-w-md animate-rise [animation-delay:320ms]">
              <BookingNotes />
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
      <ExitIntent />
    </PageShell>
  );
}
