import type {
  FoodTruthReport,
  ValidatedFoodTruthResult,
} from "@/lib/engine/types";
import { ReportCard } from "@/components/report/report-card";
import { ReportDisclaimer } from "@/components/report/report-disclaimer";
import { ReportActions } from "@/components/report/report-actions";

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

      {result && !result.success && <ValidationErrorState result={result} />}

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

function ValidationErrorState({
  result,
}: {
  result: Extract<ValidatedFoodTruthResult, { success: false }>;
}) {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        Some details need correction.
      </h3>

      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
        FoodTruth needs clean label values before generating a reliable report.
      </p>

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
  );
}

function ReportContent({ report }: { report: FoodTruthReport }) {
  return (
    <div className="mt-6">
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

        <p className="mt-4 text-sm text-[var(--warning)]">{report.grade}</p>
      </div>

      <div className="mt-5 rounded-2xl bg-[var(--accent-muted)] px-4 py-3">
        <p className="text-xs leading-6 text-[var(--primary)]">
          {report.summary}
        </p>
      </div>

<div className="mt-5">
  <ReportActions report={report} />
</div>

      <div className="mt-5 space-y-3">
        <ReportCard
          title="Nutrition load"
          value={`Sugar: ${report.nutritionLoad.sugarLoad} · Sodium: ${report.nutritionLoad.sodiumLoad} · Saturated fat: ${report.nutritionLoad.saturatedFatLoad}`}
        />

        <ReportCard
          title="Nutrition support"
          value={`Fiber: ${report.nutritionLoad.fiberSupport} · Protein: ${report.nutritionLoad.proteinSupport} · Calories: ${report.nutritionLoad.calorieDensity}`}
        />

        <ReportCard
          title="Ingredient clarity"
          value={`${report.ingredientClarity.ingredientCount} ingredients · ${report.ingredientClarity.ingredientComplexity} complexity`}
        />

        <ReportCard
          title="Serving reality"
          value={`${report.servingSizeReality.servingsPerPack} servings · ${report.servingSizeReality.risk} risk`}
        />
      </div>

      <IngredientSignals report={report} />

      <ClaimSignals report={report} />

      <Checklist report={report} />

<div className="mt-5">
  <ReportDisclaimer />
</div>
    </div>
  );
}

function IngredientSignals({ report }: { report: FoodTruthReport }) {
  const sugarAliases = report.ingredientClarity.sugarAliasesDetected;
  const additiveIndicators = report.ingredientClarity.additiveIndicatorsDetected;

  return (
    <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/38">
        Ingredient signals
      </p>

      <div className="mt-4 space-y-3">
        <SignalRow
          label="Primary ingredient"
          value={report.ingredientClarity.primaryIngredient ?? "Not detected"}
        />
        <SignalRow
          label="Sugar terms"
          value={sugarAliases.length > 0 ? sugarAliases.join(", ") : "None"}
        />
        <SignalRow
          label="Additive indicators"
          value={
            additiveIndicators.length > 0
              ? additiveIndicators.join(", ")
              : "None"
          }
        />
      </div>
    </div>
  );
}

function ClaimSignals({ report }: { report: FoodTruthReport }) {
  const flaggedClaims = report.claimRisk.flaggedClaims;

  return (
    <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/38">
        Claim review
      </p>

      {flaggedClaims.length === 0 ? (
        <p className="mt-3 text-xs leading-6 text-[var(--foreground)]/58">
          No front-label claim risks were flagged from the provided claims.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {flaggedClaims.map((claim) => (
            <div
              key={`${claim.claim}-${claim.reason}`}
              className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-[var(--foreground)]/72">
                  {claim.claim}
                </p>
                <span className="rounded-full bg-[var(--warning)]/12 px-2.5 py-1 text-[10px] font-medium text-[var(--warning)]">
                  {claim.risk}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/55">
                {claim.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Checklist({ report }: { report: FoodTruthReport }) {
  return (
    <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/38">
        Better choice checklist
      </p>

      <div className="mt-4 space-y-2">
        {report.betterChoiceChecklist.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-[var(--background)] px-4 py-3"
          >
            <p className="text-xs leading-5 text-[var(--foreground)]/62">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[var(--background)] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/35">
        {label}
      </p>
      <p className="mt-1 text-xs leading-5 text-[var(--foreground)]/68">
        {value}
      </p>
    </div>
  );
}