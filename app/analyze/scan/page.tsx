import Link from "next/link";
import { ArrowLeft, ScanLine } from "lucide-react";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";

export default function ScanAnalyzerPage() {
  return (
    <AnalyzerPageShell>
      <Link
        href="/analyze"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)]/62 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to analyze
      </Link>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_0.55fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
            Instant Scan
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
            Camera-led label scanning is being prepared.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
            This mode will support quick label capture, reviewable extracted
            values, and the same FoodTruth report structure used by manual
            entry.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
            <ScanLine className="h-5 w-5" />
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
            Planned workflow
          </p>

          <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
            Capture label, review detected values, correct mistakes, then
            generate a structured FoodTruth report.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)]/55 p-8 text-center">
        <p className="text-sm font-medium text-[var(--foreground)]/70">
          Scan flow placeholder
        </p>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--foreground)]/50">
          The camera workflow will be added only after the upload and review
          pipeline is stable.
        </p>
      </section>
    </AnalyzerPageShell>
  );
}