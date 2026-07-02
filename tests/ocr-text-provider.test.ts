import { describe, expect, it } from "vitest";
import {
  ocrTextProviderConfig,
  runMockUploadOcrTextExtraction,
} from "@/lib/analyze/ocr-text-provider";
import { createUploadImageInput } from "@/lib/analyze/upload-image-input";

describe("OCR text provider", () => {
  it("keeps OCR text extraction privacy-safe and review-first", () => {
    expect(ocrTextProviderConfig.storesOriginalImage).toBe(false);
    expect(ocrTextProviderConfig.storesFileName).toBe(false);
    expect(ocrTextProviderConfig.storesFileSize).toBe(false);
    expect(ocrTextProviderConfig.requiresUserReview).toBe(true);
  });

  it("returns mock OCR text blocks for upload extraction", async () => {
    const result = await runMockUploadOcrTextExtraction(
      createUploadImageInput("image/jpeg")
    );

    expect(result.success).toBe(true);
    expect(result.source).toBe("upload");
    expect(result.message).toBe(
      "Mock OCR text extracted from a temporary upload input. Review is required before report generation."
    );
    expect(result.blocks.map((block) => block.kind)).toEqual([
      "serving",
      "nutrition",
      "ingredients",
      "claims",
    ]);
  });

  it("includes visible nutrition text for parsing", async () => {
    const result = await runMockUploadOcrTextExtraction(
      createUploadImageInput("image/png")
    );
    const nutritionBlock = result.blocks.find(
      (block) => block.kind === "nutrition"
    );

    expect(nutritionBlock?.text).toContain("126.91");
    expect(nutritionBlock?.text).toContain("Sugar 9.68g");
  });
});