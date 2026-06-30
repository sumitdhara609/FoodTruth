import { describe, expect, it } from "vitest";
import {
  scanAnalyzerPageConfig,
  uploadAnalyzerPageConfig,
} from "@/lib/analyze/analyzer-placeholder-page-config";

describe("analyzer placeholder page configuration", () => {
  it("keeps upload page copy focused on reviewable extraction", () => {
    expect(uploadAnalyzerPageConfig.eyebrow).toBe("Upload Label");
    expect(uploadAnalyzerPageConfig.title).toContain("Upload-based");
    expect(uploadAnalyzerPageConfig.workflowDescription).toContain(
      "review extracted values"
    );
    expect(uploadAnalyzerPageConfig.icon).toBeDefined();
  });

  it("keeps scan page copy focused on reviewable capture", () => {
    expect(scanAnalyzerPageConfig.eyebrow).toBe("Instant Scan");
    expect(scanAnalyzerPageConfig.title).toContain("Camera-led");
    expect(scanAnalyzerPageConfig.workflowDescription).toContain(
      "review detected values"
    );
    expect(scanAnalyzerPageConfig.icon).toBeDefined();
  });

  it("keeps both image-based modes marked as placeholder flows", () => {
    expect(uploadAnalyzerPageConfig.placeholderTitle).toBe(
      "Upload flow placeholder"
    );
    expect(scanAnalyzerPageConfig.placeholderTitle).toBe(
      "Scan flow placeholder"
    );
  });
});