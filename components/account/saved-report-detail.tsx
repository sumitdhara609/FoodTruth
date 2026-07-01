import type { SavedLabelReport } from "@/lib/account/saved-label-report";

type SavedReportDetailProps = {
  report: SavedLabelReport;
};

export function SavedReportDetail({ report }: SavedReportDetailProps) {
  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
              Saved Report
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              {report.productName}
            </h2>

            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
              {report.brandName ?? "Brand not added"} ·{" "}
              {report.category ?? "Category not added"}
            </p>
          </div>

          <span className="rounded-full bg-[var(--accent-muted)] px-4 py-2 text-xs font-semibold text-[var(--primary)]">
            {report.source}
          </span>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-5">
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

          <p className="mt-5 text-sm leading-7 text-[var(--foreground)]/58">
            {report.summary}
          </p>
        </div>

        <p className="mt-5 text-xs leading-6 text-[var(--foreground)]/42">
          Saved on {new Date(report.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-4">
        <SignalBlock
          title="Nutrition Snapshot"
          content={report.nutritionSnapshot}
        />

        <SignalBlock
          title="Ingredient Snapshot"
          content={report.ingredientSnapshot}
        />

        <SignalBlock title="Claim Snapshot" content={report.claimSnapshot} />

        <SignalBlock
          title="Serving Snapshot"
          content={report.servingSnapshot}
        />

        <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
            Better-Choice Checklist
          </p>

          <ul className="mt-4 space-y-3">
            {report.betterChoiceChecklist.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 px-4 py-3 text-sm leading-6 text-[var(--foreground)]/58"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SignalBlock({ title, content }: { title: string; content: unknown }) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5">
      <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
        {title}
      </p>

      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 p-4 text-xs leading-6 text-[var(--foreground)]/58">
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}