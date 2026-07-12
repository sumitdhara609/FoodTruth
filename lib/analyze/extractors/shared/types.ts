/**
 * FoodTruth OCR Engine
 * --------------------------------------
 * Shared types used by every extractor.
 */

export type ExtractionConfidence =
  | "Unknown"
  | "Low"
  | "Medium"
  | "High";

export type ExtractionEvidence = {
  /**
   * OCR line that produced the value.
   */
  text: string;

  /**
   * Original line number.
   */
  lineNumber: number;
};

export type ExtractedField<T = string> = {
  /**
   * Extracted value.
   */
  value: T;

  /**
   * Confidence assigned by the extractor.
   */
  confidence: ExtractionConfidence;

  /**
   * Which extractor produced this value.
   */
  extractor: string;

  /**
   * OCR evidence supporting the extraction.
   */
  evidence: ExtractionEvidence[];
};

export type ExtractorResult<T> = {
  success: boolean;

  data: T;

  warnings: string[];
};