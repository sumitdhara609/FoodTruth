import { describe, expect, it } from "vitest";
import { analyzeIngredientClarity } from "@/lib/engine/ingredient-clarity-engine";
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
    "sugar, refined flour, palm oil, glucose syrup, cocoa solids, emulsifier, stabilizer, artificial flavour",
  claims: ["healthy", "energy", "high fiber"],
  ...overrides,
});

describe("analyzeIngredientClarity", () => {
  it("detects primary ingredient, sugar aliases, additives, and complexity", () => {
    const result = analyzeIngredientClarity(createBaseInput());

    expect(result.primaryIngredient).toBe("sugar");
    expect(result.ingredientCount).toBe(8);
    expect(result.sugarAliasesDetected).toContain("sugar");
    expect(result.sugarAliasesDetected).toContain("glucose syrup");
    expect(result.additiveIndicatorsDetected).toContain("emulsifier");
    expect(result.additiveIndicatorsDetected).toContain("stabilizer");
    expect(result.additiveIndicatorsDetected).toContain("artificial flavour");
    expect(result.ingredientComplexity).toBe("Moderate");
  });

  it("classifies a short and transparent ingredient list as low complexity", () => {
    const result = analyzeIngredientClarity(
      createBaseInput({
        ingredients: "oats, almonds, dates, cocoa",
      })
    );

    expect(result.primaryIngredient).toBe("oats");
    expect(result.ingredientCount).toBe(4);
    expect(result.sugarAliasesDetected).toEqual([]);
    expect(result.additiveIndicatorsDetected).toEqual([]);
    expect(result.ingredientComplexity).toBe("Low");
  });

  it("handles an empty ingredient list safely", () => {
    const result = analyzeIngredientClarity(
      createBaseInput({
        ingredients: "",
      })
    );

    expect(result.primaryIngredient).toBeNull();
    expect(result.ingredientCount).toBe(0);
    expect(result.sugarAliasesDetected).toEqual([]);
    expect(result.additiveIndicatorsDetected).toEqual([]);
    expect(result.ingredientComplexity).toBe("Low");
  });
});