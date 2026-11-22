export function Logo({ tone = "bone" }: { tone?: "bone" | "claret" }) {
  const text = tone === "bone" ? "text-bone" : "text-claret";
  return (
    <a href="#top" className={`flex items-center gap-2 font-display text-xl font-bold ${text}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-lime text-sm font-extrabold text-claret-deep">
        Z2
      </span>
      <span>
        Z2 <span className="text-serif-accent font-normal">Agents</span>
      </span>
    </a>
  );
}
