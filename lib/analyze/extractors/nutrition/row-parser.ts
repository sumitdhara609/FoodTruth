import { parseNutritionValue } from "./value-parser";

export type ParsedNutritionRow = {

  nutrient: string;

  value: string;

  unit: string;

};

export function parseNutritionRow(
  line: string
): ParsedNutritionRow | null {

  const parsed =
    parseNutritionValue(line);

  if (!parsed) {
    return null;
  }

  const nutrient =
    line
      .replace(
        parsed.value,
        ""
      )
      .replace(
        parsed.unit,
        ""
      )
      .replace(/[:\-]/g, "")
      .trim();

  return {

    nutrient,

    value:
      parsed.value,

    unit:
      parsed.unit,

  };

}