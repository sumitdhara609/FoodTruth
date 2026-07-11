/**
 * FoodTruth OCR Engine
 * --------------------
 * Normalizes nutrition measurement units.
 *
 * This module only standardizes units.
 * It never changes numeric values.
 */

export function fixUnits(
  text: string
): string {
  if (!text) {
    return "";
  }

  let normalized = text;

  // ---------------------------------
  // Calories
  // ---------------------------------

  normalized = normalized.replace(
    /\bk[\s.-]*cal\b/gi,
    "kcal"
  );

  normalized = normalized.replace(
    /\bcalories\b/gi,
    "Calories"
  );

  // ---------------------------------
  // Grams
  // ---------------------------------

  normalized = normalized.replace(
    /\bgrams?\b/gi,
    "g"
  );

  normalized = normalized.replace(
    /\bgms?\b/gi,
    "g"
  );

  normalized = normalized.replace(
    /\bgm\b/gi,
    "g"
  );

  // ---------------------------------
  // Milligrams
  // ---------------------------------

  normalized = normalized.replace(
    /\bmilligrams?\b/gi,
    "mg"
  );

  normalized = normalized.replace(
    /\bm\.?g\.?\b/gi,
    "mg"
  );

  // ---------------------------------
  // Micrograms
  // ---------------------------------

  normalized = normalized.replace(
    /\bmcg\b/gi,
    "mcg"
  );

  normalized = normalized.replace(
    /\bμg\b/gi,
    "mcg"
  );

  normalized = normalized.replace(
    /\bmicrograms?\b/gi,
    "mcg"
  );

  // ---------------------------------
  // Kilojoules
  // ---------------------------------

  normalized = normalized.replace(
    /\bk[\s.-]*j\b/gi,
    "kJ"
  );

  normalized = normalized.replace(
    /\bkilojoules?\b/gi,
    "kJ"
  );

  // ---------------------------------
  // Percent
  // ---------------------------------

  normalized = normalized.replace(
    /\bpercent\b/gi,
    "%"
  );

  normalized = normalized.replace(
    /\bper cent\b/gi,
    "%"
  );

  // ---------------------------------
  // Approx
  // ---------------------------------

  normalized = normalized.replace(
    /\bapproximately\b/gi,
    "approx"
  );

  normalized = normalized.replace(
    /\bapprox\.\b/gi,
    "approx"
  );

  return normalized;
}