export type OcrCleanupResult = {
  cleanedText: string;
  corrections: string[];
};

const OCR_CORRECTIONS: Array<[RegExp, string]> = [
  [/SODlUM/gi, "SODIUM"],
  [/PR0TEIN/gi, "PROTEIN"],
  [/FlBER/gi, "FIBER"],
  [/FlBRE/gi, "FIBRE"],
  [/SUGA\s+R/gi, "SUGAR"],
  [/T0TAL/gi, "TOTAL"],
  [/SATURATED\s+FAT/gi, "SATURATED FAT"],
  [/ENERGY\s*KCAL/gi, "ENERGY"],
];

export function cleanOcrText(
  rawText: string
): OcrCleanupResult {
  let text = rawText;

  const corrections: string[] = [];

  for (const [pattern, replacement] of OCR_CORRECTIONS) {
    if (pattern.test(text)) {
      corrections.push(`${pattern} → ${replacement}`);
      text = text.replace(pattern, replacement);
    }
  }

  text = text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return {
    cleanedText: text,
    corrections,
  };
}