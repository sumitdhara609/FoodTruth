import { describe, expect, it } from "vitest";
import { mockUploadOcrTextResult } from "@/lib/analyze/mock-ocr-text";
import { parseOcrTextToExtractionDraft } from "@/lib/analyze/ocr-to-draft-parser";

describe("OCR to draft parser", () => {
  it("parses serving and pack size from OCR text", () => {
    const draft = parseOcrTextToExtractionDraft(mockUploadOcrTextResult);

    expect(draft.servingSizeGrams.value).toBe("25");
    expect(draft.packSizeGrams.value).toBe("400");
  });

  it("parses nutrition values from OCR text", () => {
    const draft = parseOcrTextToExtractionDraft(mockUploadOcrTextResult);

    expect(draft.calories.value).toBe("126.91");
    expect(draft.totalFatGrams.value).toBe("6.10");
    expect(draft.saturatedFatGrams.value).toBe("2.70");
    expect(draft.sugarGrams.value).toBe("9.68");
    expect(draft.sodiumMg.value).toBe("2.22");
    expect(draft.proteinGrams.value).toBe("1.69");
    expect(draft.fiberGrams.value).toBe("0.72");
  });

  it("keeps parsed draft review-first", () => {
    const draft = parseOcrTextToExtractionDraft(mockUploadOcrTextResult);

    expect(draft.calories.source).toBe("ocr");
    expect(draft.ingredients.confidence).toBe("Low");
  });
});