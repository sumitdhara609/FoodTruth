import { describe, expect, it } from "vitest";
import { buildExtractionDraft } from "@/lib/analyze/vision/draft-builder";
import { evaluateOcrDraftQuality } from "@/lib/analyze/ocr-draft-quality";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";

describe("OCR draft quality", () => {
  it("marks a complete draft as ready when required values are present", () => {
    const result: OcrTextResult = {
      source: "upload",
      provider: "browser",
      success: true,
      storesOriginalImage: false,
      requiresUserReview: true,
      message: "OCR text extracted.",
      blocks: [
        {
          kind: "serving",
          confidence: "High",
          text: "Serving size 25g Servings per pack 16",
        },
        {
          kind: "nutrition",
          confidence: "High",
          text: "Energy 126 kcal Total Fat 6g Sugar 9g Sodium 120mg",
        },
      ],
    };

    const draft = buildExtractionDraft(result);
    const quality = evaluateOcrDraftQuality(draft);

    expect(quality.level).toBe("Ready");
    expect(quality.missingRequiredFieldCount).toBe(0);
  });

  it("marks a draft incomplete when required values are missing", () => {
    const result: OcrTextResult = {
      source: "upload",
      provider: "browser",
      success: true,
      storesOriginalImage: false,
      requiresUserReview: true,
      message: "OCR text extracted.",
      blocks: [
        {
          kind: "nutrition",
          confidence: "Unknown",
          text: "Protein 3g Fibre 2g",
        },
      ],
    };

    const draft = buildExtractionDraft(result);
    const quality = evaluateOcrDraftQuality(draft);

    expect(quality.level).toBe("Incomplete");
    expect(quality.missingRequiredFieldCount).toBeGreaterThan(0);
    expect(quality.issues.some((issue) => issue.field === "calories")).toBe(
      true
    );
  });

  it("marks low confidence values as needing review", () => {
    const result: OcrTextResult = {
      source: "upload",
      provider: "browser",
      success: true,
      storesOriginalImage: false,
      requiresUserReview: true,
      message: "OCR text extracted.",
      blocks: [
        {
          kind: "serving",
          confidence: "High",
          text: "Serving size 25g Servings per pack 16",
        },
        {
          kind: "nutrition",
          confidence: "Low",
          text: "Energy 126 kcal Total Fat 6g Sugar 9g Sodium 120mg",
        },
      ],
    };

    const draft = buildExtractionDraft(result);
    const quality = evaluateOcrDraftQuality(draft);

    expect(quality.level).toBe("Needs Review");
    expect(quality.lowConfidenceFieldCount).toBeGreaterThan(0);
  });
});