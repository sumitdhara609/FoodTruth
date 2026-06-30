import { describe, expect, it } from "vitest";
import { sampleManualLabel } from "@/lib/analyze/sample-manual-label";
import { buildFoodLabelInputFromManualState } from "@/lib/analyze/manual-input-adapter";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";

describe("sample manual label", () => {
  it("can generate a valid FoodTruth report", () => {
    const input = buildFoodLabelInputFromManualState(sampleManualLabel);
    const result = generateValidatedFoodTruthReport(input);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.report.productName).toBe("Multigrain Breakfast Bar");
      expect(result.report.score).toBeGreaterThanOrEqual(0);
      expect(result.report.score).toBeLessThanOrEqual(100);
    }
  });
});