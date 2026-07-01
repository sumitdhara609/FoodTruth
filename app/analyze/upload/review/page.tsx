import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { UploadReviewDraftPanel } from "@/components/analyze/upload-review-draft-panel";

export default function UploadReviewPage() {
  return (
    <AnalyzerPageShell>
      <section>
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Upload Review
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Review the label before creating a report.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          The upload workflow uses the image as a temporary reference. FoodTruth
          only saves reviewed label data and generated report signals.
        </p>
      </section>

      <UploadReviewDraftPanel />
    </AnalyzerPageShell>
  );
}