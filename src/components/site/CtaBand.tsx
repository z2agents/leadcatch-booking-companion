import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/Reveal";

export function CtaBand() {
  return (
    <section className="px-5 pb-16 md:pb-24">
      <Reveal>
        <div className="grain relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] bg-claret-deep px-6 py-10 text-bone md:flex-row md:items-center md:px-12 md:py-12">
          <h2 className="text-3xl font-bold leading-[0.95] md:text-5xl">
            Stop losing clients <span className="text-serif-accent text-lime">to voicemail.</span>
          </h2>
          <Button asChild variant="lime" size="xl" className="w-full sm:w-auto">
            <Link to="/book">
              Book a free demo call <ArrowRight />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
