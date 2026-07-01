import type { ReactNode } from "react";
import { ProductNav } from "@/components/navigation/product-nav";

type AnalyzerPageShellProps = {
  children: ReactNode;
};

export function AnalyzerPageShell({ children }: AnalyzerPageShellProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl">
        <ProductNav />

        {children}
      </div>
    </main>
  );
}