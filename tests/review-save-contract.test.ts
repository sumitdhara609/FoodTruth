import { describe, expect, it } from "vitest";
import {
  getReviewSaveContract,
  reviewSaveContracts,
} from "@/lib/analyze/review-save-contract";

describe("review save contract", () => {
  it("defines save contracts for every report source", () => {
    expect(Object.keys(reviewSaveContracts)).toEqual([
      "manual",
      "upload",
      "scan",
    ]);
  });

  it("keeps every save contract signed-in and reviewed-data only", () => {
    expect(
      Object.values(reviewSaveContracts).every(
        (contract) =>
          contract.requiresSignedInUser &&
          contract.storesReviewedLabelDataOnly
      )
    ).toBe(true);
  });

  it("maps manual review to the manual save action", () => {
    expect(getReviewSaveContract("manual").actionName).toBe(
      "saveManualReportAction"
    );
  });

  it("maps upload review to the upload save action", () => {
    expect(getReviewSaveContract("upload").actionName).toBe(
      "saveUploadReviewReportAction"
    );
  });

  it("maps scan review to the scan save action", () => {
    expect(getReviewSaveContract("scan").actionName).toBe(
      "saveScanReviewReportAction"
    );
  });
});