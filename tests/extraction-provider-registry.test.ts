import { describe, expect, it } from "vitest";
import {
  getActiveExtractionProvider,
  getPlannedExtractionProviders,
  runActiveUploadExtraction,
} from "@/lib/analyze/extraction-provider-registry";

describe("extraction provider registry", () => {
  it("returns the active extraction provider", () => {
    const provider = getActiveExtractionProvider();

    expect(provider.key).toBe("mock");
    expect(provider.label).toBe("Draft extraction");
    expect(provider.status).toBe("Active");
  });

  it("keeps OCR extraction registered as planned", () => {
    const plannedProviders = getPlannedExtractionProviders();

    expect(plannedProviders.map((provider) => provider.key)).toContain("ocr");
  });

  it("runs the active extraction provider with upload mime type", async () => {
    const result = await runActiveUploadExtraction("image/png");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.draft.calories.value).toBe("126.91");
    }
  });
});