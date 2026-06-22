import { describe, expect, it } from "vitest";
import { analyzeServingSizeReality } from "@/lib/engine/serving-size-engine";
import type { FoodLabelInput } from "@/lib/engine/types";

const createBaseInput = (
  overrides: Partial<FoodLabelInput> = {}
): FoodLabelInput => ({
  productName: "Choco Energy Bar",
  brandName: "Demo Foods",
  category: "Snack",
  servingSizeGrams: 20,
  packSizeGrams: 200,
  calories: 90,
  sugarGrams: 8,
  sodiumMg: 60,
  totalFatGrams: 3.5,
  saturatedFatGrams: 2,
  proteinGrams: 1.5,
  fiberGrams: 0.5,
  ingredients:
    "sugar, refined flour, palm oil, glucose syrup, cocoa solids, emulsifier",
  claims: ["healthy", "energy"],
  ...overrides,
});

describe("analyzeServingSizeReality", () => {
  it("flags very small serving sizes across large packs as high risk", () => {
    const result = analyzeServingSizeReality(createBaseInput());

    expect(result.servingsPerPack).toBe(10);
    expect(result.risk).toBe("High");
    expect(result.reason).toContain("serving size is small");
  });

  it("classifies moderate risk when a pack contains several servings", () => {
    const result = analyzeServingSizeReality(
      createBaseInput({
        servingSizeGrams: 40,
        packSizeGrams: 200,
      })
    );

    expect(result.servingsPerPack).toBe(5);
    expect(result.risk).toBe("Moderate");
  });

  it("classifies low risk when serving size is aligned with pack size", () => {
    const result = analyzeServingSizeReality(
      createBaseInput({
        servingSizeGrams: 100,
        packSizeGrams: 100,
      })
    );

    expect(result.servingsPerPack).toBe(1);
    expect(result.risk).toBe("Low");
  });

  it("handles invalid serving size safely", () => {
    const result = analyzeServingSizeReality(
      createBaseInput({
        servingSizeGrams: 0,
        packSizeGrams: 200,
      })
    );

    expect(result.servingsPerPack).toBe(0);
    expect(result.risk).toBe("Moderate");
    expect(result.reason).toContain("missing or invalid");
  });
});