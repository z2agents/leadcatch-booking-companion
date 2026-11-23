import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

const faqs = [
  { q: "Does it really sound human?", a: "Yes — natural voice, trained on your business." },
  { q: "Will it work with my calendar?", a: "Yes — it syncs with Google Calendar." },
  { q: "How fast can I go live?", a: "Usually within 7 days — we set it all up." },
  { q: "What if a caller needs a real person?", a: "It transfers the call or texts you instantly." },
];

export function Faq() {
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-5xl font-bold leading-[0.95] text-claret">
            Quick <span className="text-serif-accent">answers.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="font-display text-lg text-claret hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
