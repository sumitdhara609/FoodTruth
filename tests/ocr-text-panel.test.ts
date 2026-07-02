import { describe, expect, it } from "vitest";

describe("OCR text panel", () => {
  it("exports the OCR text panel component", async () => {
    const ocrTextPanelModule = await import(
      "@/components/analyze/ocr-text-panel"
    );

    expect(typeof ocrTextPanelModule.OcrTextPanel).toBe("function");
  });
});