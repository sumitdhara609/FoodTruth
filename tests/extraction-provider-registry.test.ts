import { describe, expect, it } from "vitest";
import {
  getActiveExtractionProvider,
  runActiveUploadExtraction,
} from "@/lib/analyze/extraction-provider-registry";

describe("extraction provider registry", () => {
  it("returns the active extraction provider", () => {
    const provider = getActiveExtractionProvider();

    expect(provider.key).toBe("mock");
    expect(provider.label).toBe("Mock extraction");
  });

  it("runs the active extraction provider", async () => {
    const result = await runActiveUploadExtraction();

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.draft.calories.value).toBe("126.91");
    }
  });
});