import { describe, expect, it } from "vitest";
import { parseOcrTextToExtractionDraft } from "@/lib/analyze/ocr-to-draft-parser";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";
import {
  createOcrFieldReviewChecklist,
  summarizeOcrFieldReviewChecklist,
} from "@/lib/analyze/ocr-field-review-checklist";

describe("OCR field review checklist", () => {
  it("marks missing required fields", () => {
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

    const draft = parseOcrTextToExtractionDraft(result);
    const checklist = createOcrFieldReviewChecklist(draft);
    const summary = summarizeOcrFieldReviewChecklist(checklist);

    expect(summary.missing).toBeGreaterThan(0);
    expect(checklist.find((item) => item.field === "calories")?.status).toBe(
      "missing"
    );
  });

  it("marks low-confidence extracted values", () => {
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

    const draft = parseOcrTextToExtractionDraft(result);
    const checklist = createOcrFieldReviewChecklist(draft);

    expect(checklist.find((item) => item.field === "calories")?.status).toBe(
      "low-confidence"
    );
  });

  it("summarizes checklist status counts", () => {
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

    const draft = parseOcrTextToExtractionDraft(result);
    const checklist = createOcrFieldReviewChecklist(draft);
    const summary = summarizeOcrFieldReviewChecklist(checklist);

    expect(summary.total).toBe(13);
    expect(summary.missing).toBe(0);
    expect(summary.ready).toBeGreaterThan(0);
  });
});