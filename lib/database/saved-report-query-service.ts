import type { SavedLabelReport } from "@/lib/account/saved-label-report";
import type { SavedLabelReportRow } from "@/lib/database/saved-report-row";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SavedReportQueryResult =
  | {
      success: true;
      reports: SavedLabelReport[];
    }
  | {
      success: false;
      message: string;
      reports: [];
    };

export const mapSavedReportRowToAccountReport = (
  row: SavedLabelReportRow
): SavedLabelReport => {
  return {
    id: row.id,
    userId: row.user_id,
    source: row.source,
    productName: row.product_name,
    brandName: row.brand_name ?? undefined,
    category: row.category ?? undefined,
    score: row.score,
    grade: row.grade,
    riskLevel: row.risk_level,
    summary: row.summary,
    nutritionSnapshot: row.nutrition_snapshot,
    ingredientSnapshot: row.ingredient_snapshot,
    claimSnapshot: row.claim_snapshot,
    servingSnapshot: row.serving_snapshot,
    betterChoiceChecklist: row.better_choice_checklist,
    createdAt: row.created_at,
  };
};

export const getSavedReportsForUser = async (
  userId: string
): Promise<SavedReportQueryResult> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("saved_label_reports")
    .select(
      [
        "id",
        "user_id",
        "source",
        "product_name",
        "brand_name",
        "category",
        "score",
        "grade",
        "risk_level",
        "summary",
        "reviewed_label_data",
        "nutrition_snapshot",
        "ingredient_snapshot",
        "claim_snapshot",
        "serving_snapshot",
        "better_choice_checklist",
        "created_at",
      ].join(",")
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    return {
      success: false,
      message: error.message,
      reports: [],
    };
  }

  return {
    success: true,
    reports: ((data ?? []) as SavedLabelReportRow[]).map(
      mapSavedReportRowToAccountReport
    ),
  };
};