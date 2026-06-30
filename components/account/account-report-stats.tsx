import type { AccountReportStats as AccountReportStatsValue } from "@/lib/account/account-report-stats";

type AccountReportStatsProps = {
  stats: AccountReportStatsValue;
};

export function AccountReportStats({ stats }: AccountReportStatsProps) {
  const statItems = [
    {
      label: "Saved reports",
      value: stats.totalReports.toString(),
      description: "Reviewed label records in your account.",
    },
    {
      label: "Average score",
      value: stats.averageScore === null ? "—" : `${stats.averageScore}/100`,
      description: "Average FoodTruth score across saved reports.",
    },
    {
      label: "Concern watch",
      value: stats.highConcernReports.toString(),
      description: "Saved reports with stronger concern signals.",
    },
  ];

  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Account Overview
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
            Your label archive at a glance.
          </h2>
        </div>

        {stats.latestReport && (
          <div className="rounded-2xl bg-[var(--accent-muted)] px-4 py-3 text-[var(--primary)]">
            <p className="text-[10px] uppercase tracking-[0.2em]">
              Latest report
            </p>
            <p className="mt-1 text-sm font-semibold">
              {stats.latestReport.productName}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/35">
              {item.label}
            </p>

            <p className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              {item.value}
            </p>

            <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/50">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}