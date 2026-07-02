import type { OcrDraftQualityResult } from "@/lib/analyze/ocr-draft-quality";

type OcrDraftQualityPanelProps = {
  quality: OcrDraftQualityResult | null;
};

export function OcrDraftQualityPanel({ quality }: OcrDraftQualityPanelProps) {
  if (!quality) {
    return (
      <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
          Draft Quality
        </p>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/52">
          Run extraction to evaluate whether the OCR draft is complete enough
          for review.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
            Draft Quality
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            {quality.level}
          </h3>
        </div>

        <span className="rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/45">
          Review required
        </span>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <QualityMetric label="Extracted" value={quality.extractedFieldCount} />
        <QualityMetric
          label="Missing"
          value={quality.missingRequiredFieldCount}
        />
        <QualityMetric label="Low confidence" value={quality.lowConfidenceFieldCount} />
      </div>

      {quality.issues.length > 0 && (
        <div className="mt-5 grid gap-3">
          {quality.issues.slice(0, 6).map((issue) => (
            <div
              key={`${issue.field}-${issue.severity}`}
              className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--background)]/70 p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                  {issue.label}
                </span>

                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/40">
                  {issue.severity}
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
                {issue.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function QualityMetric({ label, value }: { label: string; value: number }) {
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