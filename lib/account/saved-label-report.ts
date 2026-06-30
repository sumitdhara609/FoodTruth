import type { AnalyzerInputSource } from "@/lib/analyze/label-review-draft";
import type { FoodTruthReport } from "@/lib/engine/types";

export type SavedLabelReport = {
  id: string;
  userId: string;
  source: AnalyzerInputSource;
  productName: string;
  brandName?: string;
  category?: string;
  score: number;
  grade: FoodTruthReport["grade"];
  riskLevel: FoodTruthReport["riskLevel"];
  summary: string;
  nutritionSnapshot: FoodTruthReport["nutritionLoad"];
  ingredientSnapshot: FoodTruthReport["ingredientClarity"];
  claimSnapshot: FoodTruthReport["claimRisk"];
  servingSnapshot: FoodTruthReport["servingSizeReality"];
  betterChoiceChecklist: string[];
  createdAt: string;
};

export const createSavedLabelReport = ({
  id,
  userId,
  source,
  report,
  createdAt,
}: {
  id: string;
  userId: string;
  source: AnalyzerInputSource;
  report: FoodTruthReport;
  createdAt: string;
}): SavedLabelReport => {
  return {
    id,
    userId,
    source,
    productName: report.productName,
    score: report.score,
    grade: report.grade,
    riskLevel: report.riskLevel,
    summary: report.summary,
    nutritionSnapshot: report.nutritionLoad,
    ingredientSnapshot: report.ingredientClarity,
    claimSnapshot: report.claimRisk,
    servingSnapshot: report.servingSizeReality,
    betterChoiceChecklist: report.betterChoiceChecklist,
    createdAt,
  };
};