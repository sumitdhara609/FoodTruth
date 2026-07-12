import type {
  BenchmarkFieldResult,
} from "./types";

/**
 * Calculates benchmark accuracy.
 */
export function calculateAccuracy(
  fields: BenchmarkFieldResult[]
) {

  const total =
    fields.length;

  const passed =
    fields.filter(
      field => field.passed
    ).length;

  return {

    passed,

    total,

    accuracy:
      total === 0
        ? 0
        : Number(
            (
              (passed / total) *
              100
            ).toFixed(2)
          ),

  };

}