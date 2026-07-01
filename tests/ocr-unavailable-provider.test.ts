import { describe, expect, it } from "vitest";
import { ocrUnavailableProvider } from "@/lib/analyze/ocr-unavailable-provider";

describe("OCR unavailable provider", () => {
  it("keeps future OCR provider review-first and privacy-safe", () => {
    expect(ocrUnavailableProvider.storesOriginalImage).toBe(false);
    expect(ocrUnavailableProvider.requiresUserReview).toBe(true);
  });

  it("returns a clear unavailable result while OCR is not active", async () => {
    const result = await ocrUnavailableProvider.run();

    expect(result.success).toBe(false);
    expect(result.status).toBe("Unavailable");
    expect(result.input.originalImageStored).toBe(false);
    expect(result.message).toContain("OCR extraction is not active yet");
  });
});