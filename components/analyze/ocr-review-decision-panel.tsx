import type { OcrReviewDecision } from "@/lib/analyze/ocr-review-decision";

type OcrReviewDecisionPanelProps = {
  decision: OcrReviewDecision | null;
};

export function OcrReviewDecisionPanel({
  decision,
}: OcrReviewDecisionPanelProps) {
  if (!decision) {
    return (
      <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
          Review Decision
        </p>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/52">
          Run extraction to receive the next review action.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
            Review Decision
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            {decision.title}
          </h3>
        </div>

        <span className="rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/45">
          {decision.canGenerateReport ? "Can generate" : "Fix first"}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/55">
        {decision.message}
      </p>
    </section>
  );
}