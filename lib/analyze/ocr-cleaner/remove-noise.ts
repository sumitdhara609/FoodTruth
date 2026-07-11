/**
 * FoodTruth OCR Engine
 * --------------------
 * Removes obvious OCR garbage while
 * preserving meaningful food label text.
 *
 * IMPORTANT
 * ----------
 * This module MUST NOT remove anything
 * that could be useful to later extractors.
 */

const NOISE_PATTERNS: RegExp[] = [

  // Repeated separators
  /^[-_=]{4,}$/,

  /^\.{4,}$/,

  /^,{4,}$/,

  /^\*{4,}$/,

  /^#{4,}$/,

  /^~{4,}$/,

  /^\|{4,}$/,

  /^:{4,}$/,

  /^;{4,}$/,

  /^_{4,}$/,

  // OCR garbage like
  // ||||||||
  // ••••••••
  // ========
  /^[^\w\s]{6,}$/,

];

function isNoiseLine(
  line: string
): boolean {

  const trimmed = line.trim();

  if (!trimmed) {
    return false;
  }

  for (const pattern of NOISE_PATTERNS) {

    if (pattern.test(trimmed)) {
      return true;
    }

  }

  return false;

}

export function removeNoise(
  text: string
): string {

  if (!text) {
    return "";
  }

  return text
    .split("\n")
    .filter(line => !isNoiseLine(line))
    .join("\n");

}