import type { FoodTruthReport, RiskLevel } from "@/lib/engine/types";

type ReportScoreCardProps = {
  report: FoodTruthReport;
};

const riskDescriptions: Record<RiskLevel, string> = {
  Low: "The label shows fewer major concern signals based on the entered values.",
  Moderate:
    "The label has some concern signals worth checking before making it a regular choice.",
  High: "The label shows stronger concern signals across one or more major areas.",
  Critical:
    "The label shows multiple strong concern signals and should be interpreted carefully.",
};

export function ReportScoreCard({ report }: ReportScoreCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--foreground)]/48">
            FoodTruth Score
          </p>

          <p className="mt-2 text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)]">
            {report.score}
            <span className="ml-1 text-lg text-[var(--foreground)]/45">
              /100
            </span>
          </p>
        </div>

        <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
          {report.riskLevel}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-[var(--warning)]">
        {report.grade}
      </p>

      <p className="mt-3 text-xs leading-6 text-[var(--foreground)]/55">
        {riskDescriptions[report.riskLevel]}
      </p>
    </div>
  );
}