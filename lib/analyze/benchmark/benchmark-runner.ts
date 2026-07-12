import { runExtractionPipeline } from "@/lib/analyze/pipeline";

import { compareDrafts } from "./comparison";
import { calculateAccuracy } from "./accuracy";

import type {
  BenchmarkCase,
  BenchmarkResult,
} from "./types";

/**
 * Runs a single benchmark case.
 */
export async function runBenchmarkCase(
  benchmark: BenchmarkCase
): Promise<BenchmarkResult> {

  const pipeline =
    await runExtractionPipeline({

      rawOcrText:
        benchmark.rawOcrText,

    });

  const comparison =
    compareDrafts(

      benchmark.expected,

      pipeline.draft,

    );

  const accuracy =
    calculateAccuracy(
      comparison
    );

  return {

    id:
      benchmark.id,

    name:
      benchmark.name,

    passedFields:
      accuracy.passed,

    totalFields:
      accuracy.total,

    accuracy:
      accuracy.accuracy,

    fields:
      comparison,

  };

}