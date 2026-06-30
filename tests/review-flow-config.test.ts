import { describe, expect, it } from "vitest";
import { scanReviewSteps } from "@/lib/analyze/scan-review-flow";
import { uploadReviewSteps } from "@/lib/analyze/upload-review-flow";

describe("review flow configuration", () => {
  it("keeps upload review flow focused on temporary image handling", () => {
    expect(uploadReviewSteps.map((step) => step.title)).toEqual([
      "Temporary upload",
      "Review before report",
      "Data-light history",
    ]);
  });

  it("keeps scan review flow focused on temporary capture handling", () => {
    expect(scanReviewSteps.map((step) => step.title)).toEqual([
      "Temporary capture",
      "Review before report",
      "Data-light history",
    ]);
  });

  it("provides descriptions and icons for every review step", () => {
    const allSteps = [...uploadReviewSteps, ...scanReviewSteps];

    for (const step of allSteps) {
      expect(step.description.length).toBeGreaterThan(0);
      expect(step.icon).toBeDefined();
    }
  });
});