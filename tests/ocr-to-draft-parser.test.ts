import { describe, expect, it } from "vitest";
import { mockUploadOcrTextResult } from "@/lib/analyze/mock-ocr-text";
import { parseOcrTextToExtractionDraft } from "@/lib/analyze/ocr-to-draft-parser";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";

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

  it("parses messy real OCR-style lines", () => {
    const result: OcrTextResult = {
      source: "upload",
      provider: "browser",
      success: true,
      storesOriginalImage: false,
      requiresUserReview: true,
      message: "Browser OCR extracted text.",
      blocks: [
        {
          kind: "serving",
          confidence: "Unknown",
          text: "Serving Size: 30 g Servings per pack: 10",
        },
        {
          kind: "nutrition",
          confidence: "Unknown",
          text: "Energy: 152 kcal Total Fat 5,5g Saturated Fat 2.1 g Sugars 8.4 g Sodium 120 mg Protein 3g Fibre 2g",
        },
        {
          kind: "ingredients",
          confidence: "Unknown",
          text: "Ingredients: whole grain flour, sugar, cocoa solids",
        },
        {
          kind: "claims",
          confidence: "Unknown",
          text: "Source of fibre",
        },
      ],
    };

    const draft = parseOcrTextToExtractionDraft(result);

    expect(draft.servingSizeGrams.value).toBe("30");
    expect(draft.packSizeGrams.value).toBe("300");
    expect(draft.calories.value).toBe("152");
    expect(draft.totalFatGrams.value).toBe("5.5");
    expect(draft.saturatedFatGrams.value).toBe("2.1");
    expect(draft.sugarGrams.value).toBe("8.4");
    expect(draft.sodiumMg.value).toBe("120");
    expect(draft.proteinGrams.value).toBe("3");
    expect(draft.fiberGrams.value).toBe("2");
    expect(draft.ingredients.value).toContain("whole grain flour");
    expect(draft.claims.value).toContain("Source of fibre");
  });
});