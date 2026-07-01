import {
  getSystemStatusCounts,
  systemStatusItems,
} from "@/lib/system/system-status";

const statusClassNames = {
  Ready: "bg-[var(--success)]/10 text-[var(--success)]",
  "In Progress": "bg-[var(--warning)]/12 text-[var(--warning)]",
  Planned: "bg-[var(--foreground)]/8 text-[var(--foreground)]/50",
};

export function SystemStatusPanel() {
  const counts = getSystemStatusCounts();

  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            System Status
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
            FoodTruth readiness map.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/55">
            A compact view of the product areas that are ready, in progress, or
            planned for upcoming builds.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-3 text-center">
          <StatusCount label="Ready" value={counts.Ready} />
          <StatusCount label="Progress" value={counts["In Progress"]} />
          <StatusCount label="Planned" value={counts.Planned} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {systemStatusItems.map((item) => (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold text-[var(--foreground)]/78">
                {item.title}
              </p>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClassNames[item.status]}`}
              >
                {item.status}
              </span>
            </div>

            <p className="mt-3 text-xs leading-6 text-[var(--foreground)]/52">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatusCount({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-20 rounded-2xl bg-[var(--surface)] px-3 py-2">
      <p className="text-xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        {value}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[var(--foreground)]/40">
        {label}
      </p>
    </div>
  );
}