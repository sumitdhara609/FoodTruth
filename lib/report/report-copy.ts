import type { FoodTruthReport } from "@/lib/engine/types";

const stringifySignal = (value: unknown) => {
  return JSON.stringify(value, null, 2);
};

const formatChecklist = (items: string[]) => {
  if (items.length === 0) {
    return "No checklist items generated.";
  }

  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
};

export const formatFoodTruthReportForCopy = (report: FoodTruthReport) => {
  return [
    "FoodTruth Label Report",
    "",
    `Product: ${report.productName}`,
    `Score: ${report.score}/100`,
    `Grade: ${report.grade}`,
    `Concern Level: ${report.riskLevel}`,
    "",
    "Summary",
    report.summary,
    "",
    "Nutrition Load",
    stringifySignal(report.nutritionLoad),
    "",
    "Ingredient Clarity",
    stringifySignal(report.ingredientClarity),
    "",
    "Claim Risk",
    stringifySignal(report.claimRisk),
    "",
    "Serving Size Reality",
    stringifySignal(report.servingSizeReality),
    "",
    "Better-Choice Checklist",
    formatChecklist(report.betterChoiceChecklist),
    "",
    "Note",
    "FoodTruth is an educational label-intelligence tool. It does not provide medical or dietary advice.",
  ].join("\n");
};