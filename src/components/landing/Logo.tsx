import { Link } from "@tanstack/react-router";

const inner = (
  <>
    <span className="grid size-9 place-items-center rounded-xl bg-lime text-sm font-extrabold text-claret-deep">
      Z2
    </span>
    <span>
      Z2 <span className="text-serif-accent font-normal">Agents</span>
    </span>
  </>
);

/** On the homepage the logo scrolls to the top; on other pages it links home. */
export function Logo({ tone = "bone", onHome = true }: { tone?: "bone" | "claret"; onHome?: boolean }) {
  const cls = `flex items-center gap-2 font-display text-xl font-bold ${tone === "bone" ? "text-bone" : "text-claret"}`;
  if (onHome) {
    return (
      <a href="#top" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link to="/" className={cls}>
      {inner}
    </Link>
  );
}
