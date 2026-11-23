import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Settings2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { pageHead } from "@/lib/seo";

const steps = [
  { icon: Sparkles, title: "We learn your business", sub: "Services, prices, hours." },
  { icon: Settings2, title: "We set it all up", sub: "Live in 7 days." },
  { icon: CalendarCheck, title: "You get bookings", sub: "In your calendar, automatically." },
];

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "/about",
      "About Z2 Agents — AI booking agents for service businesses",
      "Z2 Agents sets up AI agents that answer calls and chats and book appointments for salons, clinics, spas and contractors.",
    ),
  component: About,
});

function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Z2 Agents"
        title="You're busy."
        accent="We pick up."
        line="AI agents that answer and book for appointment-based businesses."
      />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-claret-soft">How we work</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-bold leading-[0.95] text-claret md:text-6xl">
              Done for you. <span className="text-serif-accent">One login.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, sub }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className={`h-full rounded-3xl p-6 ${i === 1 ? "bg-claret text-bone" : "border border-border bg-card text-claret"}`}>
                  <span className="font-display text-sm font-bold text-claret-soft">{`0${i + 1}`}</span>
                  <span className={`mt-3 grid size-10 place-items-center rounded-xl ${i === 1 ? "bg-bone/10 text-lime" : "bg-claret text-lime"}`}>
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className={`mt-1 text-sm ${i === 1 ? "text-bone/60" : "text-muted-foreground"}`}>{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}
