import { NUTRIENT_KEYWORDS } from "./keywords";

export type CanonicalNutrient =
  | "energy"
  | "protein"
  | "totalFat"
  | "saturatedFat"
  | "transFat"
  | "carbohydrates"
  | "sugar"
  | "addedSugar"
  | "fiber"
  | "sodium";

/**
 * Maps OCR nutrient names
 * to FoodTruth nutrient names.
 */
export function mapNutrient(
  text: string
): CanonicalNutrient | null {

  const lower = text
    .toLowerCase()
    .trim();

  for (const [canonical, aliases] of Object.entries(
    NUTRIENT_KEYWORDS
  )) {

    for (const alias of aliases) {

      if (lower.includes(alias)) {

        return canonical as CanonicalNutrient;

      }

    }

  }

  return null;

}