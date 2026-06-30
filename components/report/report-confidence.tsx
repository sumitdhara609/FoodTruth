import type { FoodTruthReport } from "@/lib/engine/types";

type ReportConfidenceProps = {
  report: FoodTruthReport;
};

export function ReportConfidence({ report }: ReportConfidenceProps) {
  const hasIngredientSignals =
    report.ingredientClarity.ingredientCount > 0 ||
    report.ingredientClarity.sugarAliasesDetected.length > 0 ||
    report.ingredientClarity.additiveIndicatorsDetected.length > 0;

  const hasClaimSignals = report.claimRisk.flaggedClaims.length > 0;

  const confidenceLabel =
    hasIngredientSignals && hasClaimSignals
      ? "Detailed label confidence"
      : "Standard label confidence";

  const confidenceText =
    hasIngredientSignals && hasClaimSignals
      ? "This report uses nutrition values, ingredient signals, serving context, and front-label claim checks."
      : "This report is based on the values provided. More complete ingredient and claim details can improve interpretation.";

  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/35">
        Report confidence
      </p>

      <p className="mt-2 text-sm font-medium text-[var(--foreground)]/72">
        {confidenceLabel}
      </p>

      <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/55">
        {confidenceText}
      </p>
    </div>
  );
}