import { describe, expect, it } from "vitest";

describe("OCR draft quality panel", () => {
  it("exports the OCR draft quality panel component", async () => {
    const ocrDraftQualityPanelModule = await import(
      "@/components/analyze/ocr-draft-quality-panel"
    );

    expect(typeof ocrDraftQualityPanelModule.OcrDraftQualityPanel).toBe(
      "function"
    );
  });
});