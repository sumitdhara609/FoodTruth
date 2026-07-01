import { describe, expect, it } from "vitest";
import {
  uploadReviewDraftMessages,
  uploadReviewDraftPolicy,
  uploadReviewDraftSteps,
} from "@/lib/analyze/upload-review-draft-workspace";

describe("upload review draft workspace", () => {
  it("keeps uploaded images out of persistent storage", () => {
    expect(uploadReviewDraftPolicy.imageStored).toBe(false);
    expect(uploadReviewDraftPolicy.imagePersistedAcrossPages).toBe(false);
  });

  it("keeps review manual before extraction exists", () => {
    expect(uploadReviewDraftPolicy.extractedAutomatically).toBe(false);
    expect(uploadReviewDraftPolicy.userReviewRequired).toBe(true);
    expect(uploadReviewDraftPolicy.manualReviewAvailable).toBe(true);
  });

  it("defines the upload review draft path", () => {
    expect(uploadReviewDraftSteps.map((step) => step.title)).toEqual([
      "Use the image as reference",
      "Review visible values",
      "Enter reviewed data",
      "Generate report",
    ]);
  });

  it("keeps privacy and extraction messages explicit", () => {
    expect(uploadReviewDraftMessages.privacy).toContain("does not store");
    expect(uploadReviewDraftMessages.noAutomaticExtraction).toContain(
      "Automatic extraction is not active yet"
    );
  });
});