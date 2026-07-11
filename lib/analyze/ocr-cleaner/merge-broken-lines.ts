/**
 * FoodTruth OCR Engine
 * --------------------
 * Reconstructs OCR text while preserving
 * nutrition tables and document structure.
 *
 * IMPORTANT
 * ----------
 * Never merge nutrition table rows.
 * Never merge obvious section headers.
 */

const SECTION_HEADERS = [
  "INGREDIENT",
  "INGREDIENTS",
  "NUTRITION",
  "NUTRITION FACTS",
  "NUTRITION INFORMATION",
  "ALLERGEN",
  "ALLERGENS",
  "MANUFACTURED",
  "MARKETED",
  "STORAGE",
  "STORE",
  "WARNING",
  "CLAIMS",
];

const NUTRITION_KEYWORDS = [
  "energy",
  "calories",
  "protein",
  "fat",
  "saturated",
  "trans",
  "cholesterol",
  "carbohydrate",
  "carbohydrates",
  "sugar",
  "fiber",
  "fibre",
  "sodium",
  "salt",
];

function isSectionHeader(
  line: string
): boolean {

  const upper = line.toUpperCase();

  return SECTION_HEADERS.some(header =>
    upper.startsWith(header)
  );

}

function isNutritionLine(
  line: string
): boolean {

  const lower = line.toLowerCase();

  return NUTRITION_KEYWORDS.some(keyword =>
    lower.includes(keyword)
  );

}

function endsSentence(
  line: string
): boolean {

  return /[.;:]$/.test(line);

}

function startsContinuation(
  line: string
): boolean {

  return /^[a-z(]/.test(line);

}

export function mergeBrokenLines(
  text: string
): string {

  if (!text) {
    return "";
  }

  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const merged: string[] = [];

  for (const current of lines) {

    if (merged.length === 0) {
      merged.push(current);
      continue;
    }

    const previous =
      merged[merged.length - 1];

    //
    // Never merge section headers
    //

    if (
      isSectionHeader(previous) ||
      isSectionHeader(current)
    ) {

      merged.push(current);
      continue;

    }

    //
    // Never merge nutrition rows
    //

    if (
      isNutritionLine(previous) ||
      isNutritionLine(current)
    ) {

      merged.push(current);
      continue;

    }

    //
    // Previous already ended naturally
    //

    if (endsSentence(previous)) {

      merged.push(current);
      continue;

    }

    //
    // Merge lowercase continuation
    //

    if (
      startsContinuation(current)
    ) {

      merged[
        merged.length - 1
      ] += " " + current;

      continue;

    }

    //
    // Merge very short OCR fragments
    //

    if (
      previous.length < 18
    ) {

      merged[
        merged.length - 1
      ] += " " + current;

      continue;

    }

    merged.push(current);

  }

  return merged.join("\n");

}