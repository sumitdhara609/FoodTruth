import { describe, expect, it } from "vitest";
import {
  MAX_LABEL_UPLOAD_SIZE_BYTES,
  acceptedLabelImageTypes,
  isAcceptedLabelImageType,
  isWithinLabelUploadSizeLimit,
  savedReportStoragePolicy,
} from "@/lib/account/report-storage-policy";

describe("report storage policy", () => {
  it("does not allow original label images or file metadata in saved records", () => {
    expect(savedReportStoragePolicy.storesOriginalImage).toBe(false);
    expect(savedReportStoragePolicy.storesFileName).toBe(false);
    expect(savedReportStoragePolicy.storesFileSize).toBe(false);
    expect(savedReportStoragePolicy.storesExtractedLabelData).toBe(true);
  });

  it("keeps a controlled temporary upload size limit", () => {
    expect(MAX_LABEL_UPLOAD_SIZE_BYTES).toBe(4 * 1024 * 1024);
    expect(isWithinLabelUploadSizeLimit(4 * 1024 * 1024)).toBe(true);
    expect(isWithinLabelUploadSizeLimit(4 * 1024 * 1024 + 1)).toBe(false);
  });

  it("accepts only standard label image formats", () => {
    expect(acceptedLabelImageTypes).toEqual([
      "image/jpeg",
      "image/png",
      "image/webp",
    ]);

    expect(isAcceptedLabelImageType("image/jpeg")).toBe(true);
    expect(isAcceptedLabelImageType("image/png")).toBe(true);
    expect(isAcceptedLabelImageType("image/webp")).toBe(true);
    expect(isAcceptedLabelImageType("application/pdf")).toBe(false);
  });
});