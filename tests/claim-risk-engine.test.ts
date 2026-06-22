import { describe, expect, it } from "vitest";
import { analyzeClaimRisk } from "@/lib/engine/claim-risk-engine";
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

describe("analyzeClaimRisk", () => {
  it("flags health-oriented and high-fiber claims when label support is weak", () => {
    const result = analyzeClaimRisk(createBaseInput());

    expect(result.overallRisk).toBe("High");
    expect(result.flaggedClaims).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          claim: "healthy",
          risk: "High",
        }),
        expect.objectContaining({
          claim: "high fiber",
          risk: "High",
        }),
        expect.objectContaining({
          claim: "energy",
          risk: "Moderate",
        }),
      ])
    );
  });

  it("does not flag strong high-protein claims when protein support is good", () => {
    const result = analyzeClaimRisk(
      createBaseInput({
        servingSizeGrams: 100,
        proteinGrams: 14,
        fiberGrams: 7,
        sugarGrams: 3,
        saturatedFatGrams: 1,
        ingredients: "oats, almonds, cocoa",
        claims: ["high protein"],
      })
    );

    expect(result.overallRisk).toBe("Low");
    expect(result.flaggedClaims).toEqual([]);
  });

  it("flags natural claims when additive indicators are present", () => {
    const result = analyzeClaimRisk(
      createBaseInput({
        ingredients: "oats, cocoa, stabilizer, artificial flavour",
        claims: ["natural"],
      })
    );

    expect(result.overallRisk).toBe("Moderate");
    expect(result.flaggedClaims).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          claim: "natural",
          risk: "Moderate",
        }),
      ])
    );
  });

  it("handles empty claims safely", () => {
    const result = analyzeClaimRisk(
      createBaseInput({
        claims: [],
      })
    );

    expect(result.overallRisk).toBe("Low");
    expect(result.flaggedClaims).toEqual([]);
  });
});