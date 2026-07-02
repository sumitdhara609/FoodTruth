import { describe, expect, it } from "vitest";
import type { ReviewSaveAction } from "@/lib/analyze/review-save-contract";

describe("review save action compatibility", () => {
  it("keeps manual, upload, and scan save actions compatible with the shared contract", async () => {
    const manualActions = await import("@/app/analyze/manual/actions");
    const uploadActions = await import("@/app/analyze/upload/review/actions");
    const scanActions = await import("@/app/analyze/scan/review/actions");

    const manualAction: ReviewSaveAction =
      manualActions.saveManualReportAction;
    const uploadAction: ReviewSaveAction =
      uploadActions.saveUploadReviewReportAction;
    const scanAction: ReviewSaveAction = scanActions.saveScanReviewReportAction;

    expect(typeof manualAction).toBe("function");
    expect(typeof uploadAction).toBe("function");
    expect(typeof scanAction).toBe("function");
  });
});