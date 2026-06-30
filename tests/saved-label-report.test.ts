import { describe, expect, it } from "vitest";
import { createDraftFromManualState, generateValidatedReportFromDraft } from "@/lib/analyze/label-review-draft";
import { sampleManualLabel } from "@/lib/analyze/sample-manual-label";
import { createSavedLabelReport } from "@/lib/account/saved-label-report";

describe("saved label report", () => {
  it("creates a saved report without storing image metadata", () => {
    const draft = createDraftFromManualState(sampleManualLabel, "manual");
    const result = generateValidatedReportFromDraft(draft);

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    const savedReport = createSavedLabelReport({
      id: "report_1",
      userId: "user_1",
      source: "manual",
      report: result.report,
      createdAt: "2026-06-30T00:00:00.000Z",
    });

    expect(savedReport.productName).toBe("Multigrain Breakfast Bar");
    expect(savedReport.source).toBe("manual");
    expect(savedReport.score).toBeGreaterThanOrEqual(0);
    expect(savedReport.createdAt).toBe("2026-06-30T00:00:00.000Z");

    expect("fileName" in savedReport).toBe(false);
    expect("fileSize" in savedReport).toBe(false);
    expect("imageUrl" in savedReport).toBe(false);
  });
});