import { describe, expect, it } from "vitest";
import { generateFoodTruthReport } from "@/lib/engine/foodtruth-engine";
import type { FoodLabelInput } from "@/lib/engine/types";

const createBaseInput = (
  overrides: Partial<FoodLabelInput> = {}
): FoodLabelInput => ({
  productName: "Choco Energy Bar",
  brandName: "Demo Foods",
  category: "Snack",
  servingSizeGrams: 40,
  packSizeGrams: 200,
  calories: 180,
  sugarGrams: 16,
  sodiumMg: 120,
  totalFatGrams: 7,
  saturatedFatGrams: 4,
  proteinGrams: 3,
  fiberGrams: 1,
  ingredients:
    "sugar, refined flour, palm oil, glucose syrup, cocoa solids, emulsifier",
  claims: ["healthy", "energy", "high fiber"],
  ...overrides,
});

describe("generateFoodTruthReport", () => {
  it("generates a complete report for a high-concern packaged snack", () => {
    const report = generateFoodTruthReport(createBaseInput());

    expect(report.productName).toBe("Choco Energy Bar");
    expect(report.score).toBeGreaterThanOrEqual(0);
    expect(report.score).toBeLessThanOrEqual(100);
    expect(report.grade).toBe("Very High Concern");
    expect(report.riskLevel).toBe("Critical");

    expect(report.nutritionLoad.sugarLoad).toBe("High");
    expect(report.ingredientClarity.primaryIngredient).toBe("sugar");
    expect(report.claimRisk.overallRisk).toBe("High");
    expect(report.servingSizeReality.risk).toBe("Moderate");

    expect(report.summary).toContain("Choco Energy Bar");
    expect(report.betterChoiceChecklist.length).toBeGreaterThan(0);
  });

  it("generates a stronger score for a clearer label profile", () => {
    const report = generateFoodTruthReport(
      createBaseInput({
        productName: "Oat Almond Cocoa Mix",
        servingSizeGrams: 100,
        packSizeGrams: 100,
        calories: 120,
        sugarGrams: 3,
        sodiumMg: 80,
        saturatedFatGrams: 1,
        proteinGrams: 14,
        fiberGrams: 7,
        ingredients: "oats, almonds, dates, cocoa",
        claims: [],
      })
    );

    expect(report.score).toBeGreaterThanOrEqual(70);
    expect(report.riskLevel).toBe("Low");
    expect(report.claimRisk.flaggedClaims).toEqual([]);
    expect(report.servingSizeReality.risk).toBe("Low");
  });

  it("keeps the report educational instead of medical or fear-based", () => {
    const report = generateFoodTruthReport(createBaseInput());

    expect(report.summary.toLowerCase()).not.toContain("do not eat");
    expect(report.summary.toLowerCase()).not.toContain("causes disease");
    expect(report.summary.toLowerCase()).not.toContain("medically unsafe");
  });
});