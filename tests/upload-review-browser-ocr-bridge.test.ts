import { describe, expect, it } from "vitest";

describe("upload review browser OCR bridge", () => {
  it("exports the upload review form with browser OCR bridge", async () => {
    const uploadReviewModule = await import(
      "@/components/analyze/upload-review-form"
    );

    expect(typeof uploadReviewModule.UploadReviewForm).toBe("function");
  });
});