import { describe, expect, it } from "vitest";
import { analyzerLandingPageConfig } from "@/lib/analyze/analyzer-landing-page-config";

describe("analyzer landing page configuration", () => {
  it("keeps analyzer landing copy focused on label reading choices", () => {
    expect(analyzerLandingPageConfig.eyebrow).toBe("Analyze");
    expect(analyzerLandingPageConfig.title).toContain("packaged-food label");
    expect(analyzerLandingPageConfig.description).toContain("manual entry");
    expect(analyzerLandingPageConfig.description).toContain("upload");
    expect(analyzerLandingPageConfig.description).toContain("scan");
  });
});