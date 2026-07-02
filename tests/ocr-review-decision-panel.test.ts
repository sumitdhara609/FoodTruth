import { describe, expect, it } from "vitest";

describe("OCR review decision panel", () => {
  it("exports the OCR review decision panel component", async () => {
    const ocrReviewDecisionPanelModule = await import(
      "@/components/analyze/ocr-review-decision-panel"
    );

    expect(typeof ocrReviewDecisionPanelModule.OcrReviewDecisionPanel).toBe(
      "function"
    );
  });
});