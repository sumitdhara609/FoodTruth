import { ManualAnalyzerForm } from "@/components/analyze/manual-analyzer-form";
import { ManualAnalyzerPageHeader } from "@/components/analyze/manual-analyzer-page-header";

export default function ManualAnalyzerPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <ManualAnalyzerPageHeader />

        <section className="mt-8">
          <ManualAnalyzerForm />
        </section>
      </div>
    </main>
  );
}