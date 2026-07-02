import {
  summarizeOcrFieldReviewChecklist,
  type OcrFieldReviewChecklistItem,
} from "@/lib/analyze/ocr-field-review-checklist";

type OcrFieldReviewChecklistPanelProps = {
  checklist: OcrFieldReviewChecklistItem[] | null;
};

const statusLabels: Record<OcrFieldReviewChecklistItem["status"], string> = {
  ready: "Ready",
  missing: "Missing",
  "low-confidence": "Low confidence",
  "unknown-confidence": "Review",
};

export function OcrFieldReviewChecklistPanel({
  checklist,
}: OcrFieldReviewChecklistPanelProps) {
  if (!checklist) {
    return (
      <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
          Field Review
        </p>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/52">
          Run extraction to see which fields are ready, missing, or need review.
        </p>
      </section>
    );
  }

  const summary = summarizeOcrFieldReviewChecklist(checklist);

  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
      <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
        Field Review
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        Review extracted fields.
      </h3>

      <div className="mt-5 grid gap-2 sm:grid-cols-4">
        <ChecklistMetric label="Ready" value={summary.ready} />
        <ChecklistMetric label="Missing" value={summary.missing} />
        <ChecklistMetric label="Low confidence" value={summary.lowConfidence} />
        <ChecklistMetric label="Review" value={summary.unknownConfidence} />
      </div>

      <div className="mt-5 grid gap-3">
        {checklist.map((item) => (
          <div
            key={item.field}
            className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--background)]/70 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                {item.label}
              </span>

              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/40">
                {statusLabels[item.status]}
              </span>
            </div>

            {item.value && (
              <p className="mt-3 text-sm font-semibold text-[var(--foreground)]/72">
                {item.value}
              </p>
            )}

            <p className="mt-2 text-sm leading-7 text-[var(--foreground)]/52">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChecklistMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/65 px-3 py-3 text-center">
      <p className="text-lg font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--foreground)]/40">
        {label}
      </p>
    </div>
  );
}