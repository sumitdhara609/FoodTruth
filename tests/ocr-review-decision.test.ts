import { describe, expect, it } from "vitest";
import type { OcrDraftQualityResult } from "@/lib/analyze/ocr-draft-quality";
import { getOcrReviewDecision } from "@/lib/analyze/ocr-review-decision";

const createQuality = (
  overrides: Partial<OcrDraftQualityResult>
): OcrDraftQualityResult => ({
  level: "Ready",
  extractedFieldCount: 8,
  missingRequiredFieldCount: 0,
  lowConfidenceFieldCount: 0,
  issues: [],
  ...overrides,
});

describe("OCR review decision", () => {
  it("allows report generation for ready drafts", () => {
    const decision = getOcrReviewDecision(createQuality({ level: "Ready" }));

    expect(decision.action).toBe("review-and-generate");
    expect(decision.canGenerateReport).toBe(true);
  });

  it("allows report generation after low-confidence review", () => {
    const decision = getOcrReviewDecision(
      createQuality({
        level: "Needs Review",
        lowConfidenceFieldCount: 2,
      })
    );

    expect(decision.action).toBe("verify-low-confidence");
    expect(decision.canGenerateReport).toBe(true);
  });

  it("blocks report generation guidance for incomplete drafts", () => {
    const decision = getOcrReviewDecision(
      createQuality({
        level: "Incomplete",
        missingRequiredFieldCount: 3,
      })
    );

    expect(decision.action).toBe("fix-required-fields");
    expect(decision.canGenerateReport).toBe(false);
  });
});