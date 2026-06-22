import { describe, expect, it } from "vitest";
import { analyzeNutritionLoad } from "@/lib/engine/nutrition-load-engine";
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
  ingredients: "sugar, refined flour, palm oil, cocoa solids, emulsifier",
  claims: ["healthy", "energy", "high fiber"],
  ...overrides,
});

describe("analyzeNutritionLoad", () => {
  it("classifies a high sugar and high saturated fat snack profile", () => {
    const result = analyzeNutritionLoad(createBaseInput());

    expect(result.sugarLoad).toBe("High");
    expect(result.sodiumLoad).toBe("Moderate");
    expect(result.saturatedFatLoad).toBe("High");
    expect(result.calorieDensity).toBe("High");
    expect(result.fiberSupport).toBe("Weak");
    expect(result.proteinSupport).toBe("Moderate");
  });

  it("classifies a lower-risk nutrition profile", () => {
    const result = analyzeNutritionLoad(
      createBaseInput({
        servingSizeGrams: 100,
        calories: 120,
        sugarGrams: 3,
        sodiumMg: 80,
        saturatedFatGrams: 1,
        proteinGrams: 14,
        fiberGrams: 7,
      })
    );

    expect(result.sugarLoad).toBe("Low");
    expect(result.sodiumLoad).toBe("Low");
    expect(result.saturatedFatLoad).toBe("Low");
    expect(result.calorieDensity).toBe("Low");
    expect(result.fiberSupport).toBe("Good");
    expect(result.proteinSupport).toBe("Good");
  });

  it("handles invalid serving size safely", () => {
    const result = analyzeNutritionLoad(
      createBaseInput({
        servingSizeGrams: 0,
      })
    );

    expect(result.sugarLoad).toBe("Low");
    expect(result.sodiumLoad).toBe("Low");
    expect(result.saturatedFatLoad).toBe("Low");
    expect(result.calorieDensity).toBe("Low");
    expect(result.fiberSupport).toBe("Weak");
    expect(result.proteinSupport).toBe("Weak");
  });
});