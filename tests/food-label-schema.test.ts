import { describe, expect, it } from "vitest";
import { foodLabelInputSchema } from "@/lib/validation/food-label-schema";

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

describe("foodLabelInputSchema", () => {
  it("accepts a valid food label input", () => {
    const result = foodLabelInputSchema.safeParse(validInput);

    expect(result.success).toBe(true);
  });

  it("rejects an empty product name", () => {
    const result = foodLabelInputSchema.safeParse({
      ...validInput,
      productName: "",
    });

    expect(result.success).toBe(false);
  });

  it("rejects negative nutrition values", () => {
    const result = foodLabelInputSchema.safeParse({
      ...validInput,
      sugarGrams: -1,
    });

    expect(result.success).toBe(false);
  });

  it("rejects pack size smaller than serving size", () => {
    const result = foodLabelInputSchema.safeParse({
      ...validInput,
      servingSizeGrams: 100,
      packSizeGrams: 40,
    });

    expect(result.success).toBe(false);
  });

  it("rejects saturated fat greater than total fat", () => {
    const result = foodLabelInputSchema.safeParse({
      ...validInput,
      totalFatGrams: 2,
      saturatedFatGrams: 4,
    });

    expect(result.success).toBe(false);
  });
});