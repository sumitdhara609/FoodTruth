import { describe, expect, it } from "vitest";
import {
  getLowestExtractionConfidence,
  summarizeExtractionConfidence,
} from "@/lib/analyze/extraction-confidence";
import { realLabelUploadExtractionDraft } from "@/lib/analyze/upload-review-sample";

describe("extraction confidence", () => {
  it("summarizes confidence levels in an extraction draft", () => {
    const summary = summarizeExtractionConfidence(realLabelUploadExtractionDraft);

    expect(summary.High).toBeGreaterThan(0);
    expect(summary.Medium).toBeGreaterThan(0);
    expect(summary.Low).toBeGreaterThan(0);
    expect(summary.Unknown).toBeGreaterThan(0);
  });

  it("finds the lowest confidence present in the draft", () => {
    expect(getLowestExtractionConfidence(realLabelUploadExtractionDraft)).toBe(
      "Unknown"
    );
  });
});