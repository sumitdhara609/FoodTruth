import { parseNutritionValue } from "./value-parser";

export type ParsedNutritionRow = {
  nutrient: string;
  value: string;
  unit: string;
};

/**
 * Cleans OCR formatting from a nutrition row.
 */
function normalizeRow(
  text: string
): string {

  return text

    // Dotted leaders
    .replace(/\.{2,}/g, " ")

    // Colon
    .replace(/\s*:\s*/g, " ")

    // Equal sign
    .replace(/\s*=\s*/g, " ")

    // Multiple spaces
    .replace(/\s+/g, " ")

    .trim();

}

/**
 * Parses one nutrition row.
 */
export function parseNutritionRow(
  row: string
): ParsedNutritionRow | null {

  const normalized =
    normalizeRow(row);

  const parsedValue =
    parseNutritionValue(normalized);

  if (!parsedValue) {
    return null;
  }

  const nutrient =
    normalized
      .replace(
        /[-+]?\d+(?:\.\d+)?\s*(kcal|kj|mg|g|mcg|µg|%).*/i,
        ""
      )
      .trim();

  return {

    nutrient,

    value: parsedValue.value,

    unit: parsedValue.unit,

  };

}