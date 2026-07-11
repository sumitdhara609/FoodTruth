/**
 * FoodTruth OCR Engine
 * --------------------
 * Normalizes whitespace while preserving the logical
 * structure of OCR documents.
 *
 * Responsibilities:
 * - Normalize line endings
 * - Convert tabs to spaces
 * - Collapse repeated spaces
 * - Trim line edges
 * - Remove trailing blank lines
 * - Collapse excessive blank lines
 *
 * IMPORTANT:
 * Do NOT merge lines here.
 * That is handled later by merge-broken-lines.ts
 */

export function normalizeWhitespace(
  text: string
): string {
  if (!text) {
    return "";
  }

  let normalized = text;

  // Normalize Windows / Mac line endings
  normalized = normalized
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  // Convert tabs to spaces
  normalized = normalized.replace(/\t/g, " ");

  // Remove non-breaking spaces
  normalized = normalized.replace(/\u00A0/g, " ");

  // Collapse repeated spaces
  normalized = normalized.replace(/ {2,}/g, " ");

  // Trim every line
  normalized = normalized
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  // Collapse excessive blank lines
  normalized = normalized.replace(/\n{3,}/g, "\n\n");

  // Remove leading/trailing blank lines
  normalized = normalized.trim();

  return normalized;
}