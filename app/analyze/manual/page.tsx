import { AnalyzeModeCard } from "@/components/analyze/analyze-mode-card";
import { AnalyzerPageHeader } from "@/components/analyze/analyzer-page-header";
import { analyzerModes } from "@/lib/analyze/analyzer-mode";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <AnalyzerPageHeader />

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {analyzerModes.map((mode) => (
            <AnalyzeModeCard key={mode.title} mode={mode} />
          ))}
        </section>
      </div>
    </main>
  );
}