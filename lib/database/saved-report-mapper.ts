import type { FoodTruthReport } from "@/lib/engine/types";
import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";
import type { SavedReportSource } from "@/lib/database/database-policy";

export type SavedReportInsertPayload = {
  user_id: string;
  source: SavedReportSource;
  product_name: string;
  brand_name: string | null;
  category: string | null;
  score: number;
  grade: string;
  risk_level: string;
  summary: string;
  reviewed_label_data: ManualAnalyzerState;
  nutrition_snapshot: FoodTruthReport["nutritionLoad"];
  ingredient_snapshot: FoodTruthReport["ingredientClarity"];
  claim_snapshot: FoodTruthReport["claimRisk"];
  serving_snapshot: FoodTruthReport["servingSizeReality"];
  better_choice_checklist: string[];
};

export const createSavedReportInsertPayload = ({
  userId,
  source,
  report,
  reviewedLabelData,
}: {
  userId: string;
  source: SavedReportSource;
  report: FoodTruthReport;
  reviewedLabelData: ManualAnalyzerState;
}): SavedReportInsertPayload => {
  return {
    user_id: userId,
    source,
    product_name: report.productName,
    brand_name: reviewedLabelData.brandName.trim() || null,
    category: reviewedLabelData.category.trim() || null,
    score: report.score,
    grade: report.grade,
    risk_level: report.riskLevel,
    summary: report.summary,
    reviewed_label_data: reviewedLabelData,
    nutrition_snapshot: report.nutritionLoad,
    ingredient_snapshot: report.ingredientClarity,
    claim_snapshot: report.claimRisk,
    serving_snapshot: report.servingSizeReality,
    better_choice_checklist: report.betterChoiceChecklist,
  };
};