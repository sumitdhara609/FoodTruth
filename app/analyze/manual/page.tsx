import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { ManualAnalyzerForm } from "@/components/analyze/manual-analyzer-form";
import { ManualAnalyzerPageHeader } from "@/components/analyze/manual-analyzer-page-header";

export default function ManualAnalyzerPage() {
  return (
    <AnalyzerPageShell>
      <ManualAnalyzerPageHeader />

      <section className="mt-8">
        <ManualAnalyzerForm />
      </section>
    </AnalyzerPageShell>
  );
}