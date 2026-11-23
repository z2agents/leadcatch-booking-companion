import type { ReactNode } from "react";

/** Short claret header used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  accent,
  line,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  line?: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative overflow-hidden bg-hero text-bone">
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-32 md:pb-20 md:pt-40">
        <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-bone/15 bg-bone/5 px-3 py-1.5 text-xs font-medium text-bone/80">
          <span className="size-1.5 animate-blink rounded-full bg-lime" />
          {eyebrow}
        </span>
        <h1 className="mt-6 max-w-4xl animate-rise text-5xl font-bold leading-[0.95] [animation-delay:80ms] sm:text-6xl lg:text-7xl">
          {title} {accent && <span className="text-serif-accent text-lime">{accent}</span>}
        </h1>
        {line && (
          <p className="mt-5 max-w-md animate-rise text-lg text-bone/70 [animation-delay:160ms]">{line}</p>
        )}
        {children && <div className="mt-9 animate-rise [animation-delay:240ms]">{children}</div>}
      </div>
    </section>
  );
}
