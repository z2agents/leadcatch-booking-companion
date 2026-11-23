import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { PageShell } from "./PageShell";

export function LegalPage({ title, accent, updated, children }: { title: string; accent: string; updated: string; children: ReactNode }) {
  return (
    <PageShell>
      <PageHero eyebrow={`Last updated ${updated}`} title={title} accent={accent} line="Plain words. No fine print." />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-4 px-5">{children}</div>
      </section>
    </PageShell>
  );
}

export function LegalSection({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-claret font-display text-sm font-bold text-lime">
          {String(n).padStart(2, "0")}
        </span>
        <div className="min-w-0 space-y-3 text-muted-foreground [&_a]:text-claret [&_a]:underline [&_strong]:text-claret [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          <h2 className="pt-1.5 text-2xl font-semibold text-claret">{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
