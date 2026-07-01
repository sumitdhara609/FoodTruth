import Link from "next/link";
import type { SavedLabelReport } from "@/lib/account/saved-label-report";

type SavedReportHistoryPreviewProps = {
  reports: SavedLabelReport[];
};

export function SavedReportHistoryPreview({
  reports,
}: SavedReportHistoryPreviewProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          Saved Reports
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          Your label archive.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/55">
          Open a saved report to review the score, concern signals, and
          checklist generated from your reviewed label data.
        </p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {reports.map((report) => (
          <Link
            key={report.id}
            href={`/account/reports/${report.id}`}
            className="group rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--surface-muted)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]/78">
                  {report.productName}
                </p>

                <p className="mt-1 text-xs text-[var(--foreground)]/42">
                  {report.brandName ?? "Brand not added"} ·{" "}
                  {report.category ?? "Category not added"}
                </p>
              </div>

              <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-semibold text-[var(--primary)]">
                {report.grade}
              </span>
            </div>

            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-semibold leading-none tracking-[-0.08em] text-[var(--foreground)]">
                {report.score}
              </span>

              <span className="pb-1 text-xs font-semibold text-[var(--foreground)]/35">
                /100
              </span>
            </div>

            <p className="mt-3 text-xs font-medium text-[var(--warning)]">
              {report.riskLevel}
            </p>

            <p className="mt-4 line-clamp-2 text-xs leading-6 text-[var(--foreground)]/50">
              {report.summary}
            </p>

            <p className="mt-4 text-xs font-semibold text-[var(--foreground)]/35 transition group-hover:text-[var(--primary)]">
              Open report →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}