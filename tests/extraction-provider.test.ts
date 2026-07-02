import { describe, expect, it } from "vitest";
import {
  extractionProviderConfig,
  runMockUploadExtraction,
} from "@/lib/analyze/extraction-provider";

describe("extraction provider", () => {
  it("keeps extraction review-first", () => {
    expect(extractionProviderConfig.storesOriginalImage).toBe(false);
    expect(extractionProviderConfig.requiresUserReview).toBe(true);
    expect(extractionProviderConfig.directImageToReport).toBe(false);
  });

  it("returns a draft extraction from upload input and OCR text", async () => {
    const result = await runMockUploadExtraction("image/png");

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.status).toBe("Mock");
      expect(result.message).toBe(
        "Upload input converted into OCR text and extraction draft. Review the values before generating a report."
      );
      expect(result.draft.calories.value).toBe("126.91");
      expect(result.draft.ingredients.confidence).toBe("Low");
    }
  });
});