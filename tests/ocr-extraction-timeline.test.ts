import { describe, expect, it } from "vitest";
import { createOcrExtractionTimeline } from "@/lib/analyze/ocr-extraction-timeline";

describe("OCR extraction timeline", () => {
  it("creates a complete timeline when browser OCR succeeds", () => {
    const timeline = createOcrExtractionTimeline({
      hasUploadInput: true,
      hasUploadObjectUrl: true,
      browserOcrAttempted: true,
      browserOcrSucceeded: true,
      fallbackUsed: false,
      ocrTextParsed: true,
      qualityEvaluated: true,
      decisionCreated: true,
    });

    expect(timeline).toHaveLength(7);
    expect(timeline.find((step) => step.id === "browser-ocr")?.status).toBe(
      "complete"
    );
    expect(timeline.find((step) => step.id === "fallback")?.status).toBe(
      "complete"
    );
  });

  it("marks fallback as warning when browser OCR fails", () => {
    const timeline = createOcrExtractionTimeline({
      hasUploadInput: true,
      hasUploadObjectUrl: true,
      browserOcrAttempted: true,
      browserOcrSucceeded: false,
      fallbackUsed: true,
      ocrTextParsed: true,
      qualityEvaluated: true,
      decisionCreated: true,
    });

    expect(timeline.find((step) => step.id === "browser-ocr")?.status).toBe(
      "warning"
    );
    expect(timeline.find((step) => step.id === "fallback")?.status).toBe(
      "warning"
    );
  });

  it("marks browser OCR as skipped when no image reference exists", () => {
    const timeline = createOcrExtractionTimeline({
      hasUploadInput: false,
      hasUploadObjectUrl: false,
      browserOcrAttempted: false,
      browserOcrSucceeded: false,
      fallbackUsed: true,
      ocrTextParsed: true,
      qualityEvaluated: true,
      decisionCreated: true,
    });

    expect(timeline.find((step) => step.id === "upload-input")?.status).toBe(
      "warning"
    );
    expect(timeline.find((step) => step.id === "browser-ocr")?.status).toBe(
      "skipped"
    );
  });
});