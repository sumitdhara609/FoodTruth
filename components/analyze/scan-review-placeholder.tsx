import { ReviewStepCard } from "@/components/analyze/review-step-card";
import { scanReviewSteps } from "@/lib/analyze/scan-review-flow";

export function ScanReviewPlaceholder() {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Scan Review Flow
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            Camera input will become a reviewable label draft.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/56">
            Scan mode will focus on quick capture, but FoodTruth will still ask
            the user to review detected values before generating or saving a
            report.
          </p>
        </div>

        <div className="rounded-[1.5rem] bg-[var(--accent-muted)] px-5 py-4 text-[var(--primary)]">
          <p className="text-3xl font-semibold tracking-[-0.06em]">Review</p>
          <p className="mt-1 text-xs font-medium">before report</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {scanReviewSteps.map((step) => (
          <ReviewStepCard
            key={step.title}
            title={step.title}
            description={step.description}
            icon={step.icon}
          />
        ))}
      </div>
    </section>
  );
}