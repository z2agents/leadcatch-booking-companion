import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLeadFlow } from "@/components/site/LeadFlow";
import { Logo } from "./Logo";

const links = [
  { href: "#leak", label: "The problem" },
  { href: "#how", label: "How it works" },
  { href: "#everything", label: "What you get" },
  { href: "#portal", label: "Your portal" },
];

/** `onHome` keeps in-page anchors; other pages link back to the homepage sections. */
export function Nav({ onHome = true }: { onHome?: boolean }) {
  const { open: openLead } = useLeadFlow();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "bg-claret-deep/85 shadow-lift backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <Logo onHome={onHome} />
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={onHome ? l.href : `/${l.href}`}
              className="text-sm text-bone/75 transition-colors hover:text-lime"
            >
              {l.label}
            </a>
          ))}
        </div>
        <Button variant="lime" size="sm" className="h-10 px-5" onClick={openLead}>
          Book a free demo
        </Button>
      </nav>
    </header>
  );
}
