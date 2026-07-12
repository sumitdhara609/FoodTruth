import type {
  ExtractedField,
  ExtractorResult,
} from "../shared";

/**
 * Represents a single nutrition value.
 *
 * Example:
 *  Energy -> 534 kcal
 *  Protein -> 7.4 g
 */
export type NutritionField = ExtractedField<string> & {
  unit: string;
};

export type NutritionData = {
  energy: NutritionField;

  protein: NutritionField;

  totalFat: NutritionField;

  saturatedFat: NutritionField;

  transFat: NutritionField;

  carbohydrates: NutritionField;

  sugar: NutritionField;

  addedSugar: NutritionField;

  fiber: NutritionField;

  sodium: NutritionField;
};

export type NutritionExtractorResult =
  ExtractorResult<NutritionData>;