/**
 * FoodTruth OCR Engine
 * --------------------
 * Fixes common OCR mistakes found on
 * packaged food labels.
 *
 * IMPORTANT
 * ----------
 * This module should NEVER guess.
 *
 * Only fix mistakes that are extremely
 * common and highly reliable.
 */

type OcrReplacement = {
  pattern: RegExp;
  replacement: string;
};

const OCR_REPLACEMENTS: OcrReplacement[] = [

  //
  // Nutrition keywords
  //

  {
    pattern: /\benergv\b/gi,
    replacement: "Energy",
  },

  {
    pattern: /\bproteln\b/gi,
    replacement: "Protein",
  },

  {
    pattern: /\bprotien\b/gi,
    replacement: "Protein",
  },

  {
    pattern: /\bfibre\b/gi,
    replacement: "Fiber",
  },

  {
    pattern: /\bsodlum\b/gi,
    replacement: "Sodium",
  },

  {
    pattern: /\bsodiurn\b/gi,
    replacement: "Sodium",
  },

  {
    pattern: /\bcarbohvdrate\b/gi,
    replacement: "Carbohydrate",
  },

  {
    pattern: /\bcarbohvdrates\b/gi,
    replacement: "Carbohydrates",
  },

  {
    pattern: /\bsugor\b/gi,
    replacement: "Sugar",
  },

  //
  // Ingredients
  //

  {
    pattern: /\blngredients\b/gi,
    replacement: "Ingredients",
  },

  {
    pattern: /\bingredlents\b/gi,
    replacement: "Ingredients",
  },

  {
    pattern: /\bingredlent\b/gi,
    replacement: "Ingredient",
  },

  //
  // Serving
  //

  {
    pattern: /\bservlng\b/gi,
    replacement: "Serving",
  },

  {
    pattern: /\bservlngs\b/gi,
    replacement: "Servings",
  },

  //
  // Fat
  //

  {
    pattern: /\bsalurated\b/gi,
    replacement: "Saturated",
  },

  {
    pattern: /\bsaturaled\b/gi,
    replacement: "Saturated",
  },

];

function fixNumericOcr(
  text: string
): string {

  return text

    // l00g → 100g
    .replace(/\bl(?=\d)/g, "1")

    // O.5 → 0.5
    .replace(/\bO(?=\.)/g, "0")

    // O5 → 05
    .replace(/\bO(?=\d)/g, "0")

    // l2 → 12
    .replace(/\bl(?=\d)/g, "1");
}

export function fixCommonOcrErrors(
  text: string
): string {

  if (!text) {
    return "";
  }

  let cleaned = fixNumericOcr(text);

  for (const rule of OCR_REPLACEMENTS) {
    cleaned = cleaned.replace(
      rule.pattern,
      rule.replacement
    );
  }

  return cleaned;
}