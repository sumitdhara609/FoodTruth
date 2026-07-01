import { describe, expect, it } from "vitest";
import {
  scanReviewWorkspaceCopy,
  scanReviewWorkspacePolicy,
} from "@/lib/analyze/scan-review-workspace";

describe("scan review workspace", () => {
  it("keeps scan review disabled until camera capture is active", () => {
    expect(scanReviewWorkspacePolicy.cameraCaptureActive).toBe(false);
  });

  it("keeps scan review extraction-backed and review-first", () => {
    expect(scanReviewWorkspacePolicy.usesExtractionDraft).toBe(true);
    expect(scanReviewWorkspacePolicy.requiresUserReview).toBe(true);
    expect(scanReviewWorkspacePolicy.directScanToReport).toBe(false);
  });

  it("keeps camera images out of storage", () => {
    expect(scanReviewWorkspacePolicy.storesCameraImage).toBe(false);
    expect(scanReviewWorkspacePolicy.savesOnlyReviewedLabelData).toBe(true);
  });

  it("communicates the review boundary", () => {
    expect(scanReviewWorkspaceCopy.boundary).toContain(
      "will not generate reports directly from camera images"
    );
  });
});