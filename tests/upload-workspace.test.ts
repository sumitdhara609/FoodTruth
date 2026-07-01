import { describe, expect, it } from "vitest";
import {
  uploadWorkspacePolicy,
  uploadWorkspaceSteps,
} from "@/lib/analyze/upload-workspace";

describe("upload workspace", () => {
  it("keeps image storage disabled by policy", () => {
    expect(uploadWorkspacePolicy.storesOriginalImage).toBe(false);
    expect(uploadWorkspacePolicy.storesFileName).toBe(false);
    expect(uploadWorkspacePolicy.storesFileSize).toBe(false);
  });

  it("requires user review before report generation", () => {
    expect(uploadWorkspacePolicy.requiresUserReviewBeforeReport).toBe(true);
    expect(uploadWorkspacePolicy.savesOnlyReviewedLabelData).toBe(true);
  });

  it("defines a complete upload review path", () => {
    expect(uploadWorkspaceSteps.map((step) => step.title)).toEqual([
      "Upload label image",
      "Review label values",
      "Generate FoodTruth report",
      "Save reviewed report",
    ]);
  });
});