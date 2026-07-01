import {
  getLowestExtractionConfidence,
  summarizeExtractionConfidence,
} from "@/lib/analyze/extraction-confidence";
import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

type ExtractionDraftSummaryProps = {
  draft: UploadExtractionDraft;
};

export function ExtractionDraftSummary({ draft }: ExtractionDraftSummaryProps) {
  const summary = summarizeExtractionConfidence(draft);
  const lowestConfidence = getLowestExtractionConfidence(draft);

  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]/70">
        Draft Confidence
      </p>

      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
        This draft is review-first. Future OCR values will appear here with
        confidence signals before report generation.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ConfidencePill label="High" value={summary.High} />
        <ConfidencePill label="Medium" value={summary.Medium} />
        <ConfidencePill label="Low" value={summary.Low} />
        <ConfidencePill label="Unknown" value={summary.Unknown} />
      </div>

      <p className="mt-4 text-xs leading-6 text-[var(--foreground)]/45">
        Lowest confidence present:{" "}
        <span className="font-semibold text-[var(--foreground)]/70">
          {lowestConfidence}
        </span>
      </p>
    </div>
  );
}

function ConfidencePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/75 px-3 py-2 text-center">
      <p className="text-lg font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        {value}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--foreground)]/40">
        {label}
      </p>
    </div>
  );
}