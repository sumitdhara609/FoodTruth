import { describe, expect, it } from "vitest";
import { formatFoodTruthReportForCopy } from "@/lib/report/report-copy";
import type { FoodTruthReport } from "@/lib/engine/types";

const sampleReport = {
  productName: "Sample Millet Snack",
  score: 72,
  grade: "Moderate Concern",
  riskLevel: "Moderate",
  summary:
    "This label shows some concern signals and should be reviewed carefully.",
  nutritionLoad: {
    score: 70,
    signals: ["Added sugar present"],
  },
  ingredientClarity: {
    score: 76,
    signals: ["Ingredient list is readable"],
  },
  claimRisk: {
    score: 68,
    signals: ["Front claim requires label review"],
  },
  servingSizeReality: {
    score: 74,
    signals: ["Serving size should be compared with pack size"],
  },
  betterChoiceChecklist: [
    "Compare sugar per serving.",
    "Review ingredient order.",
    "Check sodium level.",
  ],
} as unknown as FoodTruthReport;

describe("report copy formatter", () => {
  it("creates a copy-ready FoodTruth report", () => {
    const output = formatFoodTruthReportForCopy(sampleReport);

    expect(output).toContain("FoodTruth Label Report");
    expect(output).toContain("Sample Millet Snack");
    expect(output).toContain("Score: 72/100");
    expect(output).toContain("Grade: Moderate Concern");
    expect(output).toContain("Concern Level: Moderate");
    expect(output).toContain(sampleReport.summary);
  });

  it("includes the better-choice checklist in numbered form", () => {
    const output = formatFoodTruthReportForCopy(sampleReport);

    expect(output).toContain("1. Compare sugar per serving.");
    expect(output).toContain("2. Review ingredient order.");
    expect(output).toContain("3. Check sodium level.");
  });

  it("keeps the educational safety note in copied reports", () => {
    const output = formatFoodTruthReportForCopy(sampleReport);

    expect(output).toContain("educational label-intelligence tool");
    expect(output).toContain("does not provide medical or dietary advice");
  });
});