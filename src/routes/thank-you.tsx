import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, MessageSquareText } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { VideoPlaceholder } from "@/components/site/VideoPlaceholder";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/thank-you")({
  head: () =>
    pageHead("/thank-you", "You're booked — Z2 Agents", "Your Z2 Agents demo call is booked. One quick step before we talk.", {
      noindex: true,
    }),
  component: ThankYou,
});

function ThankYou() {
  // GHL redirects here after booking, but inside the calendar's frame. Same site, so lift the page out of the frame.
  useEffect(() => {
    if (window.self !== window.top) {
      try {
        window.top?.location.replace(window.location.href);
      } catch {
        /* different origin: stay inside the frame */
      }
    }
  }, []);

  return (
    <PageShell>
      <PageHero eyebrow="Booking confirmed" title="You're" accent="booked." line="One quick step before our call." />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <VideoPlaceholder caption="Watch this before our call" />
          </Reveal>
          <Reveal delay={150} className="h-full">
            <div className="flex h-full flex-col rounded-[2rem] border border-border bg-card p-7 text-claret">
              <span className="w-fit rounded-full bg-lime px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-claret-deep">
                Step 1
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">
                Confirm by replying <span className="text-serif-accent">YES</span> to our text.
              </h2>
              <div className="mt-auto space-y-2 pt-8 text-sm sm:text-[13px]">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquareText className="size-3.5" /> Z2 Agents · now
                </div>
                <p className="w-fit max-w-[85%] animate-pop rounded-2xl rounded-bl-md bg-claret px-3 py-2 text-bone">
                  <CalendarCheck className="mr-1 inline size-3.5 text-lime" /> Your demo is booked. Reply YES to confirm.
                </p>
                <p className="ml-auto w-fit animate-pop rounded-2xl rounded-br-md bg-lime px-4 py-2 font-semibold text-claret-deep [animation-delay:600ms]">
                  YES
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
