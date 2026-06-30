import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ManualAnalyzerPageHeader() {
  return (
    <>
      <Link
        href="/analyze"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)]/62 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to analyze
      </Link>

      <section className="mt-10">
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          FoodTruth Analyzer
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_0.6fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
              Manual label intelligence.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
              Enter the visible label values, ingredients, and claims to
              generate a structured FoodTruth report with nutrition, ingredient,
              claim, and serving-size signals.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
              Current phase
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
              Manual entry is active while scan and upload flows are prepared as
              future analyzer modes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}