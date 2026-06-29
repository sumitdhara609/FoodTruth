import { describe, expect, it } from "vitest";
import {
  buildFoodLabelInputFromManualState,
  splitClaims,
  toNumber,
  type ManualAnalyzerState,
} from "@/lib/analyze/manual-input-adapter";

const baseState: ManualAnalyzerState = {
  productName: "Multigrain Breakfast Bar",
  brandName: "Demo Foods",
  category: "Snack",
  servingSizeGrams: "40",
  packSizeGrams: "200",
  calories: "180",
  sugarGrams: "12",
  sodiumMg: "110",
  totalFatGrams: "6",
  saturatedFatGrams: "2",
  proteinGrams: "4",
  fiberGrams: "2",
  ingredients: "whole grains, dates, sugar, glucose syrup, cocoa, stabilizer",
  claims: "high fiber, natural",
};

describe("manual input adapter", () => {
  it("converts numeric form fields into numbers", () => {
    expect(toNumber("40")).toBe(40);
    expect(toNumber("12.5")).toBe(12.5);
  });

  it("returns NaN for non-numeric values", () => {
    expect(Number.isNaN(toNumber("abc"))).toBe(true);
  });

  it("splits comma-separated claims cleanly", () => {
    expect(splitClaims("high fiber, natural, no added sugar")).toEqual([
      "high fiber",
      "natural",
      "no added sugar",
    ]);
  });

  it("removes empty claim values", () => {
    expect(splitClaims("high fiber, , natural,")).toEqual([
      "high fiber",
      "natural",
    ]);
  });

  it("builds a FoodLabelInput from manual form state", () => {
    const input = buildFoodLabelInputFromManualState(baseState);

    expect(input.productName).toBe("Multigrain Breakfast Bar");
    expect(input.servingSizeGrams).toBe(40);
    expect(input.packSizeGrams).toBe(200);
    expect(input.sugarGrams).toBe(12);
    expect(input.claims).toEqual(["high fiber", "natural"]);
  });

  it("omits empty optional brand and category values", () => {
    const input = buildFoodLabelInputFromManualState({
      ...baseState,
      brandName: "",
      category: "",
    });

    expect(input.brandName).toBeUndefined();
    expect(input.category).toBeUndefined();
  });
});