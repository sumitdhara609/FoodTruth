export function AnalyzerPageHeader() {
  return (
    <section className="pt-8">
      <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
        FoodTruth Analyzer
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
        <div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
            Choose how the label enters the system.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
            FoodTruth begins with label details and turns them into a structured
            report across nutrition load, ingredient clarity, front-label
            claims, and serving-size reality.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
            Current build
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
            Manual entry is active first so the scoring engine, validation, and
            report experience stay stable before image-based flows are added.
          </p>
        </div>
      </div>
    </section>
  );
}