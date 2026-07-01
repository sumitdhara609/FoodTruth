import { describe, expect, it } from "vitest";
import {
  scanWorkspaceCopy,
  scanWorkspacePolicy,
  scanWorkspaceSteps,
} from "@/lib/analyze/scan-workspace";

describe("scan workspace", () => {
  it("keeps scan privacy-safe", () => {
    expect(scanWorkspacePolicy.storesCameraImage).toBe(false);
    expect(scanWorkspacePolicy.storesFileName).toBe(false);
    expect(scanWorkspacePolicy.storesFileSize).toBe(false);
  });

  it("keeps scan review-first", () => {
    expect(scanWorkspacePolicy.requiresUserReviewBeforeReport).toBe(true);
    expect(scanWorkspacePolicy.directScanToReport).toBe(false);
    expect(scanWorkspacePolicy.savesOnlyReviewedLabelData).toBe(true);
  });

  it("defines the scan review pipeline", () => {
    expect(scanWorkspaceSteps.map((step) => step.title)).toEqual([
      "Capture label",
      "Create extraction draft",
      "Review values",
      "Generate report",
    ]);
  });

  it("communicates camera capture status", () => {
    expect(scanWorkspaceCopy.unavailable).toContain(
      "Live camera capture is not active yet"
    );
  });
});