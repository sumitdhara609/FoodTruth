import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { UploadReviewForm } from "@/components/analyze/upload-review-form";

export default function UploadReviewPage() {
  return (
    <AnalyzerPageShell>
      <section>
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Upload Review
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Create a reviewed report from the uploaded label.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          Review visible values from the uploaded label image, generate a
          FoodTruth report, and save only the reviewed label data.
        </p>
      </section>

      <UploadReviewForm />
    </AnalyzerPageShell>
  );
}