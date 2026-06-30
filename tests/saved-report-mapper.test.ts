import { describe, expect, it } from "vitest";
import { createSavedReportInsertPayload } from "@/lib/database/saved-report-mapper";
import type { FoodTruthReport } from "@/lib/engine/types";
import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";

const reviewedLabelData: ManualAnalyzerState = {
  productName: "Sample Millet Snack",
  brandName: "FoodTruth Test",
  category: "Snack",
  servingSizeGrams: "30",
  packSizeGrams: "90",
  calories: "120",
  sugarGrams: "6",
  sodiumMg: "120",
  totalFatGrams: "4",
  saturatedFatGrams: "1",
  proteinGrams: "3",
  fiberGrams: "4",
  ingredients: "Millet flour, jaggery, peanuts, salt",
  claims: "High fiber",
};

const sampleReport = {
  productName: "Sample Millet Snack",
  score: 72,
  grade: "Moderate Concern",
  riskLevel: "Moderate",
  summary:
    "This label shows some concern signals and should be reviewed carefully.",
  nutritionLoad: {
    score: 70,
    sugarLoad: "Moderate",
    sodiumLoad: "Moderate",
    saturatedFatLoad: "Low",
    fiberSupport: "Present",
    proteinSupport: "Present",
    calorieDensity: "Moderate",
  },
  ingredientClarity: {
    score: 76,
    ingredientCount: 4,
    ingredientComplexity: "Low",
    primaryIngredient: "Millet flour",
    sugarAliasesDetected: ["jaggery"],
    additiveIndicatorsDetected: [],
  },
  claimRisk: {
    score: 68,
    flaggedClaims: [
      {
        claim: "High fiber",
        risk: "Moderate",
        reason: "Front-label claim should be checked against full nutrition data.",
      },
    ],
  },
  servingSizeReality: {
    score: 74,
    servingsPerPack: 3,
    risk: "Moderate",
  },
  betterChoiceChecklist: [
    "Compare sugar per serving.",
    "Review ingredient order.",
  ],
} as unknown as FoodTruthReport;

describe("saved report mapper", () => {
  it("creates a database insert payload from a FoodTruth report", () => {
    const payload = createSavedReportInsertPayload({
      userId: "user-123",
      source: "manual",
      report: sampleReport,
      reviewedLabelData,
    });

    expect(payload.user_id).toBe("user-123");
    expect(payload.source).toBe("manual");
    expect(payload.product_name).toBe("Sample Millet Snack");
    expect(payload.brand_name).toBe("FoodTruth Test");
    expect(payload.category).toBe("Snack");
    expect(payload.score).toBe(72);
    expect(payload.grade).toBe("Moderate Concern");
    expect(payload.risk_level).toBe("Moderate");
    expect(payload.reviewed_label_data).toEqual(reviewedLabelData);
  });

  it("does not include image or file metadata in the insert payload", () => {
    const payload = createSavedReportInsertPayload({
      userId: "user-123",
      source: "manual",
      report: sampleReport,
      reviewedLabelData,
    });

    expect(payload).not.toHaveProperty("image_url");
    expect(payload).not.toHaveProperty("file_name");
    expect(payload).not.toHaveProperty("file_size");
    expect(payload).not.toHaveProperty("original_image");
  });

  it("stores empty optional identity fields as null", () => {
    const payload = createSavedReportInsertPayload({
      userId: "user-123",
      source: "manual",
      report: sampleReport,
      reviewedLabelData: {
        ...reviewedLabelData,
        brandName: "   ",
        category: "",
      },
    });

    expect(payload.brand_name).toBeNull();
    expect(payload.category).toBeNull();
  });
});