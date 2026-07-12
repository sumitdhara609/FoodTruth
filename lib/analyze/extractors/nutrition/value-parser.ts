export type ParsedNutritionValue = {
  value: string;
  unit: string;
};

/**
 * Extracts the first numeric nutrition value
 * and its unit from OCR text.
 *
 * Examples:
 *
 * 7.4 g
 * 534 kcal
 * 487 mg
 * 0.2 %
 * 128 kJ
 */
export function parseNutritionValue(
  text: string
): ParsedNutritionValue | null {

  const match = text.match(
    /([-+]?\d+(?:\.\d+)?)\s*(kcal|kj|mg|g|mcg|µg|%)/i
  );

  if (!match) {
    return null;
  }

  return {

    value: match[1],

    unit: match[2].toLowerCase(),

  };

}