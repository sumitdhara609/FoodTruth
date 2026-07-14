/**
 * Splits noisy OCR nutrition lines into
 * individual nutrient segments.
 *
 * Example:
 *
 * Energy 528 kcal, Protein 7.9 g,
 * Carbohydrate 58.8 g, Total Fat 29.5 g
 *
 * becomes
 *
 * [
 *   "Energy 528 kcal",
 *   "Protein 7.9 g",
 *   "Carbohydrate 58.8 g",
 *   "Total Fat 29.5 g"
 * ]
 */

export function splitNutritionSegments(
  line: string
): string[] {

  const normalized =

    line

      // OCR bullets
      .replace(/[•·]/g, ",")

      // OCR pipes
      .replace(/\|/g, ",")

      // semicolons
      .replace(/;/g, ",")

      // collapse spaces
      .replace(/\s+/g, " ")

      .trim();

  return normalized

    .split(",")

    .map(
      segment => segment.trim()
    )

    .filter(
      Boolean
    );

}