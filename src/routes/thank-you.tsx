import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Mail } from "lucide-react";
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
              {/* Email for now: switch back to "reply YES to our text" once Z2 has an approved texting number. */}
              <h2 className="mt-5 text-2xl font-bold leading-tight sm:text-3xl">
                Check your <span className="text-serif-accent">email.</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Your invite is on its way. Add it to your calendar. Not there? Check spam.
              </p>
              <div className="mt-auto pt-8">
                <div className="animate-pop rounded-2xl border border-border bg-background p-4 text-sm">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="size-3.5" /> Z2 Agents · now
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 font-semibold">
                    <CalendarCheck className="size-4 text-lime-deep" /> Your demo call is booked
                  </p>
                  <p className="mt-1 text-muted-foreground">Here's your time and the link to join.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
