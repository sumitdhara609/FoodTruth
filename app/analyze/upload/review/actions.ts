"use server";

import type { ReviewSaveActionResult } from "@/lib/analyze/review-save-contract";
import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";
import { buildFoodLabelInputFromManualState } from "@/lib/analyze/manual-input-adapter";
import { saveFoodTruthReport } from "@/lib/database/saved-report-service";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import { saveReportMessages } from "@/lib/report/save-report-message";
import { getCurrentUser } from "@/lib/supabase/auth";

export async function saveUploadReviewReportAction(
  reviewedLabelData: ManualAnalyzerState
): Promise<ReviewSaveActionResult> {
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
    source: "upload",
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