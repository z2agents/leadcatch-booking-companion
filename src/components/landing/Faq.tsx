import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

const faqs = [
  { q: "Does it really sound human?", a: "Yes. It speaks naturally, understands interruptions and is trained on your services, prices and FAQs." },
  { q: "Will it work with my calendar?", a: "It connects to Google Calendar, so every booking shows up instantly — no double bookings." },
  { q: "How fast can I go live?", a: "Most businesses are live within 7 days. We set up everything for you." },
  { q: "What if a caller needs a real person?", a: "The agent can transfer the call or take a message and text you right away." },
];

export function Faq() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-4xl font-bold leading-[0.95] text-claret md:text-5xl">
            Quick <span className="text-serif-accent">answers.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="font-display text-base text-claret hover:no-underline md:text-lg">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
