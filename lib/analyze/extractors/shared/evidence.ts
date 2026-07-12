import type { ExtractionEvidence } from "./types";

/**
 * Creates a single OCR evidence entry.
 */
export function createEvidence(
  text: string,
  lineNumber: number
): ExtractionEvidence {
  return {
    text,
    lineNumber,
  };
}

/**
 * Creates evidence from multiple OCR lines.
 */
export function createEvidenceList(
  lines: Array<{
    text: string;
    lineNumber: number;
  }>
): ExtractionEvidence[] {
  return lines.map((line) =>
    createEvidence(
      line.text,
      line.lineNumber
    )
  );
}