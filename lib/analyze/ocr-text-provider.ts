import { mockUploadOcrTextResult } from "@/lib/analyze/mock-ocr-text";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";
import type { UploadImageInput } from "@/lib/analyze/upload-image-input";

export type OcrTextProviderConfig = {
  activeProvider: "mock";
  storesOriginalImage: false;
  storesFileName: false;
  storesFileSize: false;
  requiresUserReview: true;
};

export const ocrTextProviderConfig: OcrTextProviderConfig = {
  activeProvider: "mock",
  storesOriginalImage: false,
  storesFileName: false,
  storesFileSize: false,
  requiresUserReview: true,
};

export const runMockUploadOcrTextExtraction = async (
  input?: UploadImageInput
): Promise<OcrTextResult> => {
  return {
    ...mockUploadOcrTextResult,
    source: input?.source ?? "upload",
    message:
      "Mock OCR text extracted from a temporary upload input. Review is required before report generation.",
  };
};