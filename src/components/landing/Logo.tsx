import { Link } from "@tanstack/react-router";
import { Z2Mark } from "./Z2Mark";

function Inner({ tone }: { tone: "bone" | "claret" }) {
  return (
    <>
      <Z2Mark className={`h-8 w-auto ${tone === "bone" ? "text-lime" : "text-claret"}`} />
      <span>
        Z2 <span className="text-serif-accent font-normal">Agents</span>
      </span>
    </>
  );
}

/** On the homepage the logo scrolls to the top; on other pages it links home. */
export function Logo({ tone = "bone", onHome = true }: { tone?: "bone" | "claret"; onHome?: boolean }) {
  const cls = `flex items-center gap-2 font-display text-xl font-bold ${tone === "bone" ? "text-bone" : "text-claret"}`;
  if (onHome) {
    return (
      <a href="#top" className={cls} aria-label="Z2 Agents, back to top">
        <Inner tone={tone} />
      </a>
    );
  }
  return (
    <Link to="/" className={cls} aria-label="Z2 Agents home">
      <Inner tone={tone} />
    </Link>
  );
}
