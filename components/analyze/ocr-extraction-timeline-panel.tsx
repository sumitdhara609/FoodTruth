import type { OcrExtractionTimelineStep } from "@/lib/analyze/ocr-extraction-timeline";

type OcrExtractionTimelinePanelProps = {
  steps: OcrExtractionTimelineStep[] | null;
};

const statusLabels: Record<OcrExtractionTimelineStep["status"], string> = {
  complete: "Complete",
  warning: "Review",
  skipped: "Skipped",
  pending: "Pending",
};

export function OcrExtractionTimelinePanel({
  steps,
}: OcrExtractionTimelinePanelProps) {
  if (!steps) {
    return (
      <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
          Extraction Timeline
        </p>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/52">
          Run extraction to see how FoodTruth handled the uploaded label.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
      <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
        Extraction Timeline
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        What happened during extraction.
      </h3>

      <div className="mt-5 grid gap-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--background)]/70 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                Step {index + 1}
              </span>

              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/40">
                {statusLabels[step.status]}
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold text-[var(--foreground)]/72">
              {step.title}
            </p>

            <p className="mt-2 text-sm leading-7 text-[var(--foreground)]/52">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}