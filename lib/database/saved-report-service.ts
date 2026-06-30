import type { FoodTruthReport } from "@/lib/engine/types";
import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";
import { createSavedReportInsertPayload } from "@/lib/database/saved-report-mapper";
import type { SavedReportSource } from "@/lib/database/database-policy";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SaveReportResult =
  | {
      success: true;
      reportId: string;
    }
  | {
      success: false;
      message: string;
    };

export const saveFoodTruthReport = async ({
  userId,
  source,
  report,
  reviewedLabelData,
}: {
  userId: string;
  source: SavedReportSource;
  report: FoodTruthReport;
  reviewedLabelData: ManualAnalyzerState;
}): Promise<SaveReportResult> => {
  const supabase = await createSupabaseServerClient();

  const payload = createSavedReportInsertPayload({
    userId,
    source,
    report,
    reviewedLabelData,
  });

  const { data, error } = await supabase
    .from("saved_label_reports")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  if (!data?.id) {
    return {
      success: false,
      message: "Saved report was created, but no report ID was returned.",
    };
  }

  return {
    success: true,
    reportId: data.id,
  };
};