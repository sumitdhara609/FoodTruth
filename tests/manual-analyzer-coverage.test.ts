import { describe, expect, it } from "vitest";
import {
  nutritionFields,
  servingFields,
} from "@/lib/analyze/manual-field-config";
import { sampleManualLabel } from "@/lib/analyze/sample-manual-label";

const requiredManualFields = [
  "productName",
  "brandName",
  "category",
  "servingSizeGrams",
  "packSizeGrams",
  "calories",
  "sugarGrams",
  "sodiumMg",
  "totalFatGrams",
  "saturatedFatGrams",
  "proteinGrams",
  "fiberGrams",
  "ingredients",
  "claims",
];

describe("manual analyzer coverage", () => {
  it("keeps sample label aligned with manual form state fields", () => {
    expect(Object.keys(sampleManualLabel).sort()).toEqual(
      [...requiredManualFields].sort()
    );
  });

  it("keeps every numeric field represented in field configuration", () => {
    const configuredNumericFields = [...servingFields, ...nutritionFields].map(
      (field) => field.key
    );

    expect(configuredNumericFields.sort()).toEqual(
      [
        "servingSizeGrams",
        "packSizeGrams",
        "calories",
        "sugarGrams",
        "sodiumMg",
        "totalFatGrams",
        "saturatedFatGrams",
        "proteinGrams",
        "fiberGrams",
      ].sort()
    );
  });
});