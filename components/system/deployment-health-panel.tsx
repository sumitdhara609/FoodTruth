import { getDeploymentHealthSnapshot } from "@/lib/deployment/deployment-health";

const statusClassName = {
  ready: "bg-[var(--success)]/10 text-[var(--success)]",
  missing: "bg-[var(--warning)]/12 text-[var(--warning)]",
};

export function DeploymentHealthPanel() {
  const snapshot = getDeploymentHealthSnapshot();

  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Deployment Health
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
            Environment readiness.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/55">
            This page checks whether the required deployment variables are
            configured. It only shows status, never secret values.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4 text-center">
          <p className="text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
            {snapshot.configuredCount}/{snapshot.totalCount}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)]/42">
            Configured
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {snapshot.items.map((item) => (
          <div
            key={item.key}
            className="flex flex-col gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]/78">
                {item.key}
              </p>

              <p className="mt-1 text-xs leading-6 text-[var(--foreground)]/48">
                {item.configured
                  ? "Configured in the current runtime."
                  : "Missing from the current runtime."}
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-[10px] font-semibold ${
                item.configured
                  ? statusClassName.ready
                  : statusClassName.missing
              }`}
            >
              {item.configured ? "Ready" : "Missing"}
            </span>
          </div>
        ))}
      </div>

      {!snapshot.ready && (
        <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4 text-xs leading-6 text-[var(--foreground)]/55">
          Add the missing variables locally in <code>.env.local</code> and in
          the production deployment environment before going live.
        </div>
      )}
    </section>
  );
}