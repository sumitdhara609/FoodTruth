import { summarizeOcrTextResult } from "@/lib/analyze/ocr-text-summary";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";

type OcrTextPanelProps = {
  result: OcrTextResult | null;
};

export function OcrTextPanel({ result }: OcrTextPanelProps) {
  if (!result) {
    return (
      <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
        <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
          OCR Text Layer
        </p>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/52">
          Run extraction to preview the OCR text before it becomes a structured
          review draft.
        </p>
      </section>
    );
  }

  const summary = summarizeOcrTextResult(result);

  return (
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
            OCR Text Layer
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            Extracted text preview.
          </h3>
        </div>

        <span className="rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/45">
          {result.provider}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/52">
        {result.message}
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-5">
        <OcrSummaryPill label="Total" value={summary.totalBlocks} />
        <OcrSummaryPill label="Serving" value={summary.servingBlocks} />
        <OcrSummaryPill label="Nutrition" value={summary.nutritionBlocks} />
        <OcrSummaryPill label="Ingredients" value={summary.ingredientBlocks} />
        <OcrSummaryPill label="Claims" value={summary.claimBlocks} />
      </div>

      <div className="mt-5 grid gap-3">
        {result.blocks.map((block) => (
          <div
            key={`${block.kind}-${block.text}`}
            className="rounded-[1.3rem] border border-[var(--border)] bg-[var(--background)]/70 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
                {block.kind}
              </span>

              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/40">
                {block.confidence}
              </span>
            </div>

            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/58">
              {block.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function OcrSummaryPill({ label, value }: { label: string; value: number }) {
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