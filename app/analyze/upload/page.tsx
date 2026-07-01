import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { UploadWorkspace } from "@/components/analyze/upload-workspace";

export default function UploadAnalyzePage() {
  return (
    <AnalyzerPageShell>
      <section>
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Upload Label
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Turn a label image into reviewed label intelligence.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          Upload a label image for temporary preview, review the visible values,
          and continue toward a FoodTruth report without storing the original
          image.
        </p>
      </section>

      <UploadWorkspace />
    </AnalyzerPageShell>
  );
}