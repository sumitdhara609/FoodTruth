import type { ExtractionConfidence } from "./types";

/**
 * Converts a numeric score (0-1)
 * into a confidence level.
 */
export function scoreToConfidence(
  score: number
): ExtractionConfidence {

  if (score >= 0.90) {
    return "High";
  }

  if (score >= 0.70) {
    return "Medium";
  }

  if (score >= 0.40) {
    return "Low";
  }

  return "Unknown";
}

/**
 * Returns the higher confidence
 * between two values.
 */
export function maxConfidence(
  a: ExtractionConfidence,
  b: ExtractionConfidence
): ExtractionConfidence {

  const order: ExtractionConfidence[] = [
    "Unknown",
    "Low",
    "Medium",
    "High",
  ];

  return order.indexOf(a) >= order.indexOf(b)
    ? a
    : b;
}