import { createFileRoute } from "@tanstack/react-router";
import { Everything } from "@/components/landing/Everything";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead(
      "/services",
      "Services — one connected AI booking platform | Z2 Agents",
      "AI calling, missed-call text-back, AI chat, calendar, website, CRM, automations and dashboard — one platform, one login.",
    ),
  component: Services,
});

function Services() {
  return (
    <PageShell>
      <PageHero eyebrow="Services" title="One package." accent="All connected." line="Calls, chats, calendar, CRM — one login." />
      <Everything />
      <CtaBand />
    </PageShell>
  );
}
