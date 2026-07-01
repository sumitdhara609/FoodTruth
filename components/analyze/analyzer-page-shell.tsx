import type { ReactNode } from "react";
import { ProductNavWrapper } from "@/components/navigation/product-nav-wrapper";

type AnalyzerPageShellProps = {
  children: ReactNode;
};

export function AnalyzerPageShell({ children }: AnalyzerPageShellProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl">
        <ProductNavWrapper />

        {children}
      </div>
    </main>
  );
}