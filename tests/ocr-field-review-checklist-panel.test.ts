import { describe, expect, it } from "vitest";

describe("OCR field review checklist panel", () => {
  it("exports the OCR field review checklist panel component", async () => {
    const ocrFieldReviewChecklistPanelModule = await import(
      "@/components/analyze/ocr-field-review-checklist-panel"
    );

    expect(
      typeof ocrFieldReviewChecklistPanelModule.OcrFieldReviewChecklistPanel
    ).toBe("function");
  });
});