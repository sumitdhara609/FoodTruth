export type ParsedNutritionValue = {
  value: string;
  unit: string;
};

/**
 * Repairs common OCR mistakes in
 * nutrition values before parsing.
 */
function normalizeValue(
  text: string
): string {

  return text

    // Letter O → zero (only before digits/units)
    .replace(/O(?=\d|\.|,|mg|g|kcal|kj|%)/gi, "0")

    // Letter l → one
    .replace(/\bl(?=\d|\.)/g, "1")

    // Comma decimal → period
    .replace(/(\d),(\d)/g, "$1.$2")

    // Collapse whitespace
    .replace(/\s+/g, " ")

    .trim();

}

/**
 * Extracts a nutrition value
 * from OCR text.
 */
export function parseNutritionValue(
  text: string
): ParsedNutritionValue | null {

  const normalized =
    normalizeValue(text);

  const match =
    normalized.match(
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