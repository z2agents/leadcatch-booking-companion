import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Leak } from "@/components/landing/Leak";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Everything } from "@/components/landing/Everything";
import { Portal } from "@/components/landing/Portal";
import { Statement } from "@/components/landing/Statement";
import { Book } from "@/components/landing/Book";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";

const title = "Z2 Agents — AI receptionists that answer every call and book appointments";
const description =
  "Stop losing clients to missed calls. Z2 Agents sets up AI calling and chat agents that talk like humans and book appointments into your Google Calendar 24/7.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <Leak />
      <HowItWorks />
      <Everything />
      <Portal />
      <Statement />
      <Book />
      <Faq />
      <Footer />
    </main>
  );
}
