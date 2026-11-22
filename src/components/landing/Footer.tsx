import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <Logo tone="claret" />
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Z2 Agents. More bookings, on autopilot.</p>
      </div>
    </footer>
  );
}
