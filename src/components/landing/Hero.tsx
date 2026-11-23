import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOK_ANCHOR } from "@/lib/site";
import { PhoneDemo } from "./PhoneDemo";

const industries = [
  "Hair salons",
  "Med spas",
  "Dental clinics",
  "Barbershops",
  "Contractors",
  "Physio",
  "Nail studios",
  "Day spas",
  "Vets",
  "Cleaning services",
  "Tattoo studios",
  "Chiropractors",
];

export function Hero() {
  return (
    <section id="top" className="grain relative overflow-hidden bg-hero text-bone">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 pb-20 pt-32 md:pt-40 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-bone/15 bg-bone/5 px-3 py-1.5 text-xs font-medium text-bone/80">
            <span className="size-1.5 animate-blink rounded-full bg-lime" />
            AI receptionist · 24/7
          </span>
          <h1 className="mt-6 animate-rise text-6xl font-bold leading-[0.92] [animation-delay:80ms] sm:text-7xl lg:text-[5.5rem]">
            You're busy.
            <br />
            <span className="text-serif-accent text-lime">We pick up.</span>
          </h1>
          <p className="mt-6 max-w-md animate-rise text-lg text-bone/70 [animation-delay:160ms]">
            Answers every call. Books every client.
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
            <Button asChild variant="lime" size="xl">
              <a href={BOOK_ANCHOR}>
                Book a free demo call <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="bone" size="xl">
              <a href="#how">See how it works</a>
            </Button>
          </div>
          <ul className="mt-10 flex animate-rise flex-wrap gap-x-6 gap-y-2 text-sm text-bone/60 [animation-delay:320ms]">
            {["No new staff", "No extra ads", "Live in 7 days"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-lime" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <PhoneDemo />
      </div>

      <div className="relative border-t border-bone/10 py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...industries, ...industries].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-xl text-bone/50">
              {t}
              <span className="size-1.5 rounded-full bg-lime" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
