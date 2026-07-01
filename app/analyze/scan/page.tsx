import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";

export default function ScanAnalyzePage() {
  return (
    <AnalyzerPageShell>
      <section>
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Instant Scan
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Prepare camera scanning without compromising review.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          Scan will use the same extraction draft and review workflow as upload.
          FoodTruth does not generate reports directly from unreviewed images.
        </p>
      </section>
    </AnalyzerPageShell>
  );
}