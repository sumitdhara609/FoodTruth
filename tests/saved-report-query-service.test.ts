import { describe, expect, it } from "vitest";
import { buildFoodLabelInputFromManualState } from "@/lib/analyze/manual-input-adapter";
import { sampleManualLabel } from "@/lib/analyze/sample-manual-label";
import { mapSavedReportRowToAccountReport } from "@/lib/database/saved-report-query-service";
import type { SavedLabelReportRow } from "@/lib/database/saved-report-row";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";

const result = generateValidatedFoodTruthReport(
  buildFoodLabelInputFromManualState(sampleManualLabel)
);

if (!result.success) {
  throw new Error("Sample manual label should generate a valid report.");
}

const report = result.report;

const row: SavedLabelReportRow = {
  id: "report-123",
  user_id: "user-123",
  source: "manual",
  product_name: report.productName,
  brand_name: null,
  category: sampleManualLabel.category,
  score: report.score,
  grade: report.grade,
  risk_level: report.riskLevel,
  summary: report.summary,
  reviewed_label_data: sampleManualLabel,
  nutrition_snapshot: report.nutritionLoad,
  ingredient_snapshot: report.ingredientClarity,
  claim_snapshot: report.claimRisk,
  serving_snapshot: report.servingSizeReality,
  better_choice_checklist: report.betterChoiceChecklist,
  created_at: "2026-06-30T16:00:00.000Z",
};

describe("saved report query service", () => {
  it("maps a database row to an account saved report", () => {
    const accountReport = mapSavedReportRowToAccountReport(row);

    expect(accountReport.id).toBe("report-123");
    expect(accountReport.userId).toBe("user-123");
    expect(accountReport.source).toBe("manual");
    expect(accountReport.productName).toBe(report.productName);
    expect(accountReport.brandName).toBeUndefined();
    expect(accountReport.category).toBe(sampleManualLabel.category);
    expect(accountReport.score).toBe(report.score);
    expect(accountReport.grade).toBe(report.grade);
    expect(accountReport.riskLevel).toBe(report.riskLevel);
    expect(accountReport.createdAt).toBe("2026-06-30T16:00:00.000Z");
  });

  it("keeps report snapshots available for the account dashboard", () => {
    const accountReport = mapSavedReportRowToAccountReport(row);

    expect(accountReport.nutritionSnapshot).toEqual(report.nutritionLoad);
    expect(accountReport.ingredientSnapshot).toEqual(report.ingredientClarity);
    expect(accountReport.claimSnapshot).toEqual(report.claimRisk);
    expect(accountReport.servingSnapshot).toEqual(report.servingSizeReality);
    expect(accountReport.betterChoiceChecklist).toEqual(
      report.betterChoiceChecklist
    );
  });
});