import { describe, expect, it } from "vitest";
import {
  getExtractionReviewRoutes,
  getReviewRoute,
  reviewRoutes,
} from "@/lib/analyze/review-route-contract";

describe("review route contract", () => {
  it("defines review routes for manual, upload, and scan sources", () => {
    expect(Object.keys(reviewRoutes)).toEqual(["manual", "upload", "scan"]);
  });

  it("keeps upload and scan review behind extraction drafts", () => {
    expect(getReviewRoute("upload").requiresExtractionDraft).toBe(true);
    expect(getReviewRoute("scan").requiresExtractionDraft).toBe(true);
  });

  it("keeps manual review independent from extraction drafts", () => {
    expect(getReviewRoute("manual").requiresExtractionDraft).toBe(false);
  });

  it("returns extraction-backed review routes", () => {
    expect(getExtractionReviewRoutes().map((route) => route.source)).toEqual([
      "upload",
      "scan",
    ]);
  });

  it("keeps every route review-first", () => {
    expect(Object.values(reviewRoutes).every((route) => route.requiresUserReview))
      .toBe(true);
  });
});