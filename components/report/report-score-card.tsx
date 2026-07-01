import type { FoodTruthReport } from "@/lib/engine/types";

type ReportScoreCardProps = {
  report: FoodTruthReport;
};

export function ReportScoreCard({ report }: ReportScoreCardProps) {
  return (
    <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--foreground)]/48">
            FoodTruth Score
          </p>

          <div className="mt-4 flex items-end gap-1">
            <span className="text-6xl font-semibold leading-none tracking-[-0.08em] text-[var(--foreground)]">
              {report.score}
            </span>

            <span className="pb-2 text-base font-semibold text-[var(--foreground)]/38">
              /100
            </span>
          </div>

          <p className="mt-5 text-base font-medium text-[var(--warning)]">
            {report.riskLevel}
          </p>
        </div>

        <span className="rounded-full bg-[var(--accent-muted)] px-4 py-2 text-xs font-semibold text-[var(--primary)]">
          {report.grade}
        </span>
      </div>

      <p className="mt-6 text-sm leading-7 text-[var(--foreground)]/58">
        {report.summary}
      </p>
    </section>
  );
}