import { AnalyzeModeCard } from "@/components/analyze/analyze-mode-card";
import { AnalyzerPageHeader } from "@/components/analyze/analyzer-page-header";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import {
  getActiveAnalyzerModes,
  getPlannedAnalyzerModes,
} from "@/lib/analyze/analyzer-mode";

export default function AnalyzePage() {
  const activeModes = getActiveAnalyzerModes();
  const plannedModes = getPlannedAnalyzerModes();

  return (
    <AnalyzerPageShell>
      <AnalyzerPageHeader />

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[...activeModes, ...plannedModes].map((mode) => (
          <AnalyzeModeCard key={mode.title} mode={mode} />
        ))}
      </section>
    </AnalyzerPageShell>
  );
}