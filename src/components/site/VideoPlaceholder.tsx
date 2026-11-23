import { Play } from "lucide-react";
import { Waveform } from "@/components/landing/PhoneDemo";

/** Stand-in for a video until the real one is added. */
export function VideoPlaceholder({ caption }: { caption: string }) {
  return (
    <figure className="group relative aspect-video overflow-hidden rounded-[2rem] bg-claret-deep text-bone shadow-lift">
      <div className="grain absolute inset-0 bg-hero opacity-90" />
      <div className="absolute inset-x-8 bottom-8 hidden opacity-40 sm:block">
        <Waveform bars={40} />
      </div>
      <div className="relative flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
        <span className="relative grid size-20 place-items-center rounded-full bg-lime text-claret-deep shadow-glow transition-transform duration-500 group-hover:scale-110">
          <span className="absolute inset-0 animate-ring rounded-full bg-lime/50" />
          <Play className="relative size-8 translate-x-0.5 fill-current" />
        </span>
        <figcaption className="font-display text-xl font-semibold sm:text-2xl">{caption}</figcaption>
        <span className="rounded-full border border-bone/15 bg-bone/5 px-3 py-1 text-xs text-bone/60">Video coming soon</span>
      </div>
    </figure>
  );
}
