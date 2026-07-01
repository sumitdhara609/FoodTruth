import type { SavedLabelReport } from "@/lib/account/saved-label-report";
import type { SavedLabelReportRow } from "@/lib/database/saved-report-row";
import { mapSavedReportRowToAccountReport } from "@/lib/database/saved-report-query-service";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SavedReportDetailResult =
  | {
      success: true;
      report: SavedLabelReport | null;
    }
  | {
      success: false;
      message: string;
      report: null;
    };

export const getSavedReportDetailForUser = async ({
  reportId,
  userId,
}: {
  reportId: string;
  userId: string;
}): Promise<SavedReportDetailResult> => {
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
    .eq("id", reportId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      message: error.message,
      report: null,
    };
  }

  if (!data) {
    return {
      success: true,
      report: null,
    };
  }

  const row = data as unknown as SavedLabelReportRow;

  return {
    success: true,
    report: mapSavedReportRowToAccountReport(row),
  };
};