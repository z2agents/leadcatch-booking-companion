import { Check } from "lucide-react";

export const DEMO_BENEFITS = ["30 minutes", "Live AI demo", "Custom plan"];

export function BenefitList({ items = DEMO_BENEFITS }: { items?: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-3">
          <span className="grid size-6 place-items-center rounded-full bg-lime text-claret-deep">
            <Check className="size-3.5" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
