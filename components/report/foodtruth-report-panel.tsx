import type {
  FoodTruthReport,
  ValidatedFoodTruthResult,
} from "@/lib/engine/types";
import { ReportCard } from "@/components/report/report-card";

type FoodTruthReportPanelProps = {
  result: ValidatedFoodTruthResult | null;
};

const emptyReportItems = [
  "Nutrition load",
  "Ingredient clarity",
  "Claim check",
  "Serving reality",
];

export function FoodTruthReportPanel({ result }: FoodTruthReportPanelProps) {
  const report = result?.success ? result.report : null;

  return (
    <aside className="rounded-[2rem] border border-[var(--border)] bg-[var(--background)]/65 p-5">
      <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
        Report Preview
      </p>

      {!result && <EmptyReportState />}

      {result && !result.success && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            Some details need correction.
          </h3>

          <div className="mt-6 space-y-3">
            {result.errors.map((error) => (
              <div
                key={`${error.field}-${error.message}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              >
                <p className="text-xs font-semibold text-[var(--danger)]">
                  {error.field}
                </p>
                <p className="mt-1 text-xs leading-5 text-[var(--foreground)]/62">
                  {error.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {report && <ReportContent report={report} />}
    </aside>
  );
}

function EmptyReportState() {
  return (
    <>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        A clearer label report will appear here.
      </h3>

      <div className="mt-8 space-y-3">
        {emptyReportItems.map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4"
          >
            <p className="text-sm font-medium text-[var(--foreground)]/72">
              {item}
            </p>
            <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/45">
              Waiting for label details.
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function ReportContent({ report }: { report: FoodTruthReport }) {
  return (
    <div className="mt-6">
      <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-sm text-[var(--foreground)]/48">FoodTruth Score</p>
        <p className="mt-2 text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)]">
          {report.score}
          <span className="ml-1 text-lg text-[var(--foreground)]/45">
            /100
          </span>
        </p>
        <p className="mt-3 text-sm text-[var(--warning)]">{report.grade}</p>
      </div>

      <div className="mt-5 space-y-3">
        <ReportCard
          title="Nutrition load"
          value={`Sugar: ${report.nutritionLoad.sugarLoad} · Sodium: ${report.nutritionLoad.sodiumLoad}`}
        />
        <ReportCard
          title="Ingredient clarity"
          value={`${report.ingredientClarity.ingredientCount} ingredients · ${report.ingredientClarity.ingredientComplexity} complexity`}
        />
        <ReportCard
          title="Claim check"
          value={`${report.claimRisk.overallRisk} claim risk`}
        />
        <ReportCard
          title="Serving reality"
          value={`${report.servingSizeReality.servingsPerPack} servings · ${report.servingSizeReality.risk} risk`}
        />
      </div>

      <div className="mt-5 rounded-2xl bg-[var(--accent-muted)] px-4 py-3">
        <p className="text-xs leading-6 text-[var(--primary)]">
          {report.summary}
        </p>
      </div>
    </div>
  );
}