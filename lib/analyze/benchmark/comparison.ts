import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

import type {
  BenchmarkFieldResult,
} from "./types";

/**
 * Compares two extraction drafts field-by-field.
 */
export function compareDrafts(
  expected: UploadExtractionDraft,
  actual: UploadExtractionDraft
): BenchmarkFieldResult[] {

  const results: BenchmarkFieldResult[] = [];

  const fields = Object.keys(
    expected
  ) as Array<keyof UploadExtractionDraft>;

  for (const field of fields) {

    const expectedValue =
      expected[field].value.trim();

    const actualValue =
      actual[field].value.trim();

    results.push({

      field,

      expected: expectedValue,

      actual: actualValue,

      passed:
        expectedValue === actualValue,

    });

  }

  return results;

}