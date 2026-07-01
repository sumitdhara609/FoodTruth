import { describe, expect, it } from "vitest";
import { realLabelUploadReviewSample } from "@/lib/analyze/upload-review-sample";
import { realLabelUploadExtractionDraft } from "@/lib/analyze/upload-review-sample";

it("keeps extraction draft confidence available for review UX", () => {
  expect(realLabelUploadExtractionDraft.calories.confidence).toBe("High");
  expect(realLabelUploadExtractionDraft.ingredients.confidence).toBe("Low");
});

describe("upload review sample", () => {
  it("keeps the real label sample ready for upload review testing", () => {
    expect(realLabelUploadReviewSample.productName).toBe(
      "Real packaged snack label test"
    );
    expect(realLabelUploadReviewSample.category).toBe("Packaged snack");
    expect(realLabelUploadReviewSample.servingSizeGrams).toBe("25");
    expect(realLabelUploadReviewSample.packSizeGrams).toBe("400");
  });

  it("uses per-serving values from the visible label test", () => {
    expect(realLabelUploadReviewSample.calories).toBe("126.91");
    expect(realLabelUploadReviewSample.sugarGrams).toBe("9.68");
    expect(realLabelUploadReviewSample.sodiumMg).toBe("2.22");
  });

  it("avoids guessing unclear label parts", () => {
    expect(realLabelUploadReviewSample.ingredients).toBe(
      "not clearly visible"
    );
    expect(realLabelUploadReviewSample.claims).toBe("none visible");
  });
});