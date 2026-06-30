import { AnalyzeModeCard } from "@/components/analyze/analyze-mode-card";
import { AnalyzerPageHeader } from "@/components/analyze/analyzer-page-header";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { analyzerModes } from "@/lib/analyze/analyzer-mode";

export default function AnalyzePage() {
  return (
    <AnalyzerPageShell>
      <AnalyzerPageHeader />

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {analyzerModes.map((mode) => (
          <AnalyzeModeCard key={mode.title} mode={mode} />
        ))}
      </section>
    </AnalyzerPageShell>
  );
}