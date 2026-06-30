import { describe, expect, it } from "vitest";
import { manualAnalyzerPageConfig } from "@/lib/analyze/manual-analyzer-page-config";

describe("manual analyzer page configuration", () => {
  it("keeps manual analyzer copy focused on structured label analysis", () => {
    expect(manualAnalyzerPageConfig.backHref).toBe("/analyze");
    expect(manualAnalyzerPageConfig.eyebrow).toBe("Manual Entry");
    expect(manualAnalyzerPageConfig.title).toContain("FoodTruth report");
    expect(manualAnalyzerPageConfig.description).toContain("nutrition values");
    expect(manualAnalyzerPageConfig.description).toContain("ingredients");
    expect(manualAnalyzerPageConfig.description).toContain("package claims");
  });
});