/**
 * FoodTruth Benchmark Engine
 * --------------------------
 * Shared benchmark types.
 */

import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

export type BenchmarkCase = {
  /**
   * Unique benchmark identifier.
   *
   * Example:
   * bingo-mad-angles
   */
  id: string;

  /**
   * Human-readable name.
   */
  name: string;

  /**
   * OCR input.
   */
  rawOcrText: string;

  /**
   * Expected extraction result.
   */
  expected: UploadExtractionDraft;
};

export type BenchmarkFieldResult = {
  field: string;

  expected: string;

  actual: string;

  passed: boolean;
};

export type BenchmarkResult = {
  id: string;

  name: string;

  passedFields: number;

  totalFields: number;

  accuracy: number;

  fields: BenchmarkFieldResult[];
};

export type BenchmarkSummary = {
  totalCases: number;

  averageAccuracy: number;

  results: BenchmarkResult[];
};