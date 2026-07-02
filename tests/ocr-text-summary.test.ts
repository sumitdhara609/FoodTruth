import { describe, expect, it } from "vitest";
import { mockUploadOcrTextResult } from "@/lib/analyze/mock-ocr-text";
import {
  getOcrTextBlocksByKind,
  summarizeOcrTextResult,
} from "@/lib/analyze/ocr-text-summary";

describe("OCR text summary", () => {
  it("summarizes OCR text blocks by kind", () => {
    const summary = summarizeOcrTextResult(mockUploadOcrTextResult);

    expect(summary.totalBlocks).toBe(4);
    expect(summary.servingBlocks).toBe(1);
    expect(summary.nutritionBlocks).toBe(1);
    expect(summary.ingredientBlocks).toBe(1);
    expect(summary.claimBlocks).toBe(1);
    expect(summary.unknownBlocks).toBe(0);
  });

  it("returns OCR text blocks by kind", () => {
    const nutritionBlocks = getOcrTextBlocksByKind(
      mockUploadOcrTextResult,
      "nutrition"
    );

    expect(nutritionBlocks).toHaveLength(1);
    expect(nutritionBlocks[0].text).toContain("Sugar 9.68g");
  });
});