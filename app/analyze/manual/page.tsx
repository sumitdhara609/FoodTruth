import Link from "next/link";
import { ManualAnalyzerForm } from "@/components/analyze/manual-analyzer-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function ManualAnalyzePage() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-4 sm:px-8 sm:py-8 lg:px-14">
      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-[var(--accent)]/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <nav className="relative z-10 flex items-center justify-between gap-6">
          <div>
            <Link
              href="/analyze"
              className="text-sm uppercase tracking-[0.38em] text-[var(--primary)]/75"
            >
              FoodTruth
            </Link>
            <p className="mt-1 text-xs text-[var(--foreground)]/50">
              Manual label analysis
            </p>
          </div>

          <ThemeToggle />
        </nav>

        <div className="relative z-10 flex-1 py-12">
          <ManualAnalyzerForm />
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}