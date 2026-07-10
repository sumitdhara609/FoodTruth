import type { FoodLabelInput } from "@/lib/engine/types";
import type { VisionExtraction } from "./schema";

const numberOrZero = (value: number | null): number => value ?? 0;

export const visionExtractionToFoodLabelInput = (
  extraction: VisionExtraction
): FoodLabelInput => {
  const nutrition = extraction.nutrition;

  return {
    productName: extraction.productName ?? "Unknown Product",

    brandName: extraction.brandName ?? "",

    category: extraction.category ?? "",

    servingSizeGrams: numberOrZero(nutrition.servingSizeGrams),

    packSizeGrams:
      numberOrZero(nutrition.servingSizeGrams) *
      Math.max(1, numberOrZero(nutrition.servingsPerPack)),

    calories: numberOrZero(nutrition.calories),

    sugarGrams: numberOrZero(nutrition.sugarGrams),

    sodiumMg: numberOrZero(nutrition.sodiumMg),

    totalFatGrams: numberOrZero(nutrition.totalFatGrams),

    saturatedFatGrams: numberOrZero(
      nutrition.saturatedFatGrams
    ),

    proteinGrams: numberOrZero(nutrition.proteinGrams),

    fiberGrams: numberOrZero(nutrition.fiberGrams),

    ingredients: extraction.ingredients.join(", "),

    claims: extraction.claims,
  };
};