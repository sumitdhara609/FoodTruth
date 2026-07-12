import type {
  BenchmarkResult,
  BenchmarkSummary,
} from "./types";

/**
 * Creates a benchmark summary.
 */
export function createBenchmarkSummary(
  results: BenchmarkResult[]
): BenchmarkSummary {

  const totalCases =
    results.length;

  const averageAccuracy =
    totalCases === 0
      ? 0
      : Number(
          (
            results.reduce(
              (sum, result) =>
                sum + result.accuracy,
              0
            ) / totalCases
          ).toFixed(2)
        );

  return {

    totalCases,

    averageAccuracy,

    results,

  };

}

/**
 * Converts benchmark summary
 * into a readable console report.
 */
export function createBenchmarkReport(
  summary: BenchmarkSummary
): string {

  const lines: string[] = [];

  lines.push("");
  lines.push("========================================");
  lines.push("      FOODTRUTH BENCHMARK REPORT");
  lines.push("========================================");
  lines.push("");

  lines.push(
    `Cases Tested : ${summary.totalCases}`
  );

  lines.push(
    `Average Accuracy : ${summary.averageAccuracy}%`
  );

  lines.push("");

  for (const result of summary.results) {

    lines.push(
      `${result.name}`
    );

    lines.push(
      `  Accuracy : ${result.accuracy}%`
    );

    lines.push(
      `  Passed : ${result.passedFields}/${result.totalFields}`
    );

    lines.push("");

  }

  return lines.join("\n");

}