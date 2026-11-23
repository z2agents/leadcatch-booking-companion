import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const pages = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-of-service", label: "Terms of Service" },
] as const;

export function Footer({ onHome = true }: { onHome?: boolean }) {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row">
        <Logo tone="claret" onHome={onHome} />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {pages.map((p) => (
            <Link key={p.to} to={p.to} className="text-sm text-claret transition-colors hover:text-claret-soft">
              {p.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-6 max-w-6xl px-5 text-center text-sm text-muted-foreground sm:text-left">
        © {new Date().getFullYear()} Z2 Agents. More bookings, on autopilot.
      </p>
    </footer>
  );
}
