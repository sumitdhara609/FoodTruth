/**
 * FoodTruth OCR Engine
 * --------------------
 * Normalizes Unicode symbols into a consistent
 * ASCII representation for downstream parsing.
 *
 * This module intentionally DOES NOT:
 * - fix OCR spelling mistakes
 * - merge lines
 * - remove text
 *
 * It only standardizes symbols.
 */

export function normalizeSymbols(
  text: string
): string {
  if (!text) {
    return "";
  }

  let normalized = text;

  // ---------------------------------
  // Quotes
  // ---------------------------------

  normalized = normalized
    .replace(/[“”«»„‟]/g, '"')
    .replace(/[‘’‚‛]/g, "'");

  // ---------------------------------
  // Dashes
  // ---------------------------------

  normalized = normalized
    .replace(/[–—−]/g, "-");

  // ---------------------------------
  // Bullets
  // ---------------------------------

  normalized = normalized
    .replace(/[•●◦∙·]/g, ",");

  // ---------------------------------
  // Ellipsis
  // ---------------------------------

  normalized = normalized
    .replace(/…/g, "...");

  // ---------------------------------
  // Multiplication sign
  // ---------------------------------

  normalized = normalized
    .replace(/×/g, "x");

  // ---------------------------------
  // Fraction slash
  // ---------------------------------

  normalized = normalized
    .replace(/⁄/g, "/");

  // ---------------------------------
  // OCR often outputs vertical bars
  // ---------------------------------

  normalized = normalized
    .replace(/\|{2,}/g, "|");

  // ---------------------------------
  // Normalize repeated commas
  // ---------------------------------

  normalized = normalized
    .replace(/,{2,}/g, ",");

  // ---------------------------------
  // Normalize repeated hyphens
  // ---------------------------------

  normalized = normalized
    .replace(/-{3,}/g, "--");

  // ---------------------------------
  // Remove invisible Unicode characters
  // ---------------------------------

  normalized = normalized
    .replace(/[\u200B-\u200D\uFEFF]/g, "");

  return normalized;
}