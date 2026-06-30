import type { AnalyzerInputSource } from "@/lib/analyze/label-review-draft";
import type { FoodTruthReport } from "@/lib/engine/types";

export type SavedLabelReportRow = {
  id: string;
  user_id: string;
  source: AnalyzerInputSource;
  product_name: string;
  brand_name: string | null;
  category: string | null;
  score: number;
  grade: FoodTruthReport["grade"];
  risk_level: FoodTruthReport["riskLevel"];
  summary: string;
  reviewed_label_data: unknown;
  nutrition_snapshot: FoodTruthReport["nutritionLoad"];
  ingredient_snapshot: FoodTruthReport["ingredientClarity"];
  claim_snapshot: FoodTruthReport["claimRisk"];
  serving_snapshot: FoodTruthReport["servingSizeReality"];
  better_choice_checklist: string[];
  created_at: string;
};