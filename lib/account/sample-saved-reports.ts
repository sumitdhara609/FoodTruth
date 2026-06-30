import { createDraftFromManualState, generateValidatedReportFromDraft } from "@/lib/analyze/label-review-draft";
import { sampleManualLabel } from "@/lib/analyze/sample-manual-label";
import { createSavedLabelReport, type SavedLabelReport } from "@/lib/account/saved-label-report";

const createSampleSavedReport = (): SavedLabelReport => {
  const draft = createDraftFromManualState(sampleManualLabel, "manual");
  const result = generateValidatedReportFromDraft(draft);

  if (!result.success) {
    throw new Error("Sample manual label must generate a valid report.");
  }

  return createSavedLabelReport({
    id: "sample_report_1",
    userId: "sample_user",
    source: "manual",
    report: result.report,
    createdAt: "2026-06-30T00:00:00.000Z",
  });
};

export const sampleSavedReports: SavedLabelReport[] = [createSampleSavedReport()];