import { describe, expect, it } from "vitest";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";

const validInput = {
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
};

describe("generateValidatedFoodTruthReport", () => {
  it("returns a FoodTruth report for valid input", () => {
    const result = generateValidatedFoodTruthReport(validInput);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.report.productName).toBe("Choco Energy Bar");
      expect(result.report.score).toBeGreaterThanOrEqual(0);
      expect(result.report.score).toBeLessThanOrEqual(100);
      expect(result.report.summary).toContain("Choco Energy Bar");
    }
  });

  it("returns validation errors for invalid input", () => {
    const result = generateValidatedFoodTruthReport({
      ...validInput,
      productName: "",
      sugarGrams: -5,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "productName",
          }),
          expect.objectContaining({
            field: "sugarGrams",
          }),
        ])
      );
    }
  });

  it("rejects pack size smaller than serving size", () => {
    const result = generateValidatedFoodTruthReport({
      ...validInput,
      servingSizeGrams: 100,
      packSizeGrams: 40,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "packSizeGrams",
          }),
        ])
      );
    }
  });

  it("handles completely unknown input safely", () => {
    const result = generateValidatedFoodTruthReport(null);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });
});