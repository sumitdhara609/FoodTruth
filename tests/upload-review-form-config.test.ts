import { describe, expect, it } from "vitest";
import {
  uploadReviewFormCopy,
  uploadReviewValueModeOptions,
} from "@/lib/analyze/upload-review-form-config";

describe("upload review form config", () => {
  it("keeps upload review copy explicit", () => {
    expect(uploadReviewFormCopy.title).toBe("Review visible label values.");
    expect(uploadReviewFormCopy.privacy).toContain("uploaded image is not stored");
    expect(uploadReviewFormCopy.extraction).toContain(
      "Automatic extraction is not active yet"
    );
  });

  it("supports per-serving and per-100g review modes", () => {
    expect(uploadReviewValueModeOptions.map((option) => option.value)).toEqual([
      "per-serving",
      "per-100g",
    ]);
  });
});