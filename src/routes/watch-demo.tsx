import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { VideoPlaceholder } from "@/components/site/VideoPlaceholder";
import { pageHead } from "@/lib/seo";

const points = [
  { icon: Phone, title: "Answers every call", sub: "24/7, in seconds." },
  { icon: MessageCircle, title: "Talks like a human", sub: "Trained on your business." },
  { icon: CalendarCheck, title: "Books the appointment", sub: "Straight into your calendar." },
];

export const Route = createFileRoute("/watch-demo")({
  head: () =>
    pageHead(
      "/watch-demo",
      "Watch the demo — Z2 Agents AI booking agent",
      "See a Z2 AI agent answer a call, talk like a human and book the appointment.",
    ),
  component: WatchDemo,
});

function WatchDemo() {
  return (
    <PageShell>
      <PageHero eyebrow="Demo" title="Watch it" accent="pick up." line="Ring. Talk. Booked." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <VideoPlaceholder caption="See our AI agent book a call" />
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {points.map(({ icon: Icon, title, sub }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 text-claret transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid size-10 place-items-center rounded-xl bg-claret text-lime">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex justify-center">
            <Button asChild variant="claret" size="xl">
              <Link to="/book">
                Book a free demo call <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
