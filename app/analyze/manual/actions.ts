"use server";

import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";
import { buildFoodLabelInputFromManualState } from "@/lib/analyze/manual-input-adapter";
import { saveFoodTruthReport } from "@/lib/database/saved-report-service";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import { saveReportMessages } from "@/lib/report/save-report-message";
import { getCurrentUser } from "@/lib/supabase/auth";

export type SaveManualReportActionResult =
  | {
      success: true;
      message: string;
      reportId: string;
    }
  | {
      success: false;
      message: string;
    };

export async function saveManualReportAction(
  reviewedLabelData: ManualAnalyzerState
): Promise<SaveManualReportActionResult> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: saveReportMessages.signedOut,
    };
  }

  const result = generateValidatedFoodTruthReport(
    buildFoodLabelInputFromManualState(reviewedLabelData)
  );

  if (!result.success) {
    return {
      success: false,
      message: saveReportMessages.invalidReport,
    };
  }

  const saveResult = await saveFoodTruthReport({
    userId: user.id,
    source: "manual",
    report: result.report,
    reviewedLabelData,
  });

  if (!saveResult.success) {
    return {
      success: false,
      message: saveResult.message,
    };
  }

  return {
    success: true,
    message: saveReportMessages.saved,
    reportId: saveResult.reportId,
  };
}