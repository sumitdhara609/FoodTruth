import { mockUploadOcrTextResult } from "@/lib/analyze/mock-ocr-text";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";

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

export const runMockUploadOcrTextExtraction =
  async (): Promise<OcrTextResult> => {
    return mockUploadOcrTextResult;
  };