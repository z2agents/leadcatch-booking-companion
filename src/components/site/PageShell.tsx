import type { ReactNode } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

/** Nav + footer around every page other than the homepage. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="overflow-x-clip">
      <Nav onHome={false} />
      {children}
      <Footer onHome={false} />
    </main>
  );
}
