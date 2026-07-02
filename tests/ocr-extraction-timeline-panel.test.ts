import { describe, expect, it } from "vitest";

describe("OCR extraction timeline panel", () => {
  it("exports the OCR extraction timeline panel component", async () => {
    const ocrExtractionTimelinePanelModule = await import(
      "@/components/analyze/ocr-extraction-timeline-panel"
    );

    expect(
      typeof ocrExtractionTimelinePanelModule.OcrExtractionTimelinePanel
    ).toBe("function");
  });
});