import { describe, expect, it } from "vitest";
import { createEmptyOcrTextResult } from "@/lib/analyze/ocr-text-result";

describe("OCR text result", () => {
  it("creates an empty privacy-safe OCR result", () => {
    const result = createEmptyOcrTextResult("upload");

    expect(result.success).toBe(false);
    expect(result.source).toBe("upload");
    expect(result.storesOriginalImage).toBe(false);
    expect(result.requiresUserReview).toBe(true);
    expect(result.blocks).toEqual([]);
  });
});