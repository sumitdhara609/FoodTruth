import type { ReactNode } from "react";

type AnalyzerPageShellProps = {
  children: ReactNode;
};

export function AnalyzerPageShell({ children }: AnalyzerPageShellProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}