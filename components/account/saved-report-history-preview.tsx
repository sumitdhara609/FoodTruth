import type { SavedLabelReport } from "@/lib/account/saved-label-report";

type SavedReportHistoryPreviewProps = {
  reports: SavedLabelReport[];
};

export function SavedReportHistoryPreview({
  reports,
}: SavedReportHistoryPreviewProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Saved History
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            Recent label records.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/56">
            Saved records will show reviewed label data and report signals
            without storing uploaded label images.
          </p>
        </div>

        <div className="rounded-[1.5rem] bg-[var(--accent-muted)] px-5 py-4 text-[var(--primary)]">
          <p className="text-3xl font-semibold tracking-[-0.06em]">
            {reports.length}
          </p>
          <p className="mt-1 text-xs font-medium">preview records</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {reports.map((report) => (
          <article
            key={report.id}
            className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]/80">
                  {report.productName}
                </p>

                <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/48">
                  {report.category ?? "Uncategorized"} · {report.source}
                </p>
              </div>

              <div className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                {report.score}/100
              </div>
            </div>

            <p className="mt-4 text-xs leading-6 text-[var(--foreground)]/56">
              {report.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--foreground)]/45">
                {report.grade}
              </span>

              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--foreground)]/45">
                {report.riskLevel}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}