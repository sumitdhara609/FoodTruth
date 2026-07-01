import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

export type OcrProviderStatus = "Ready" | "Unavailable";

export type OcrInputReference = {
  source: "upload" | "scan";
  temporaryOnly: true;
  fileNameStored: false;
  fileSizeStored: false;
  originalImageStored: false;
};

export type OcrExtractionTextBlock = {
  label: string;
  text: string;
  confidence: "High" | "Medium" | "Low" | "Unknown";
};

export type OcrProviderSuccess = {
  success: true;
  status: OcrProviderStatus;
  input: OcrInputReference;
  textBlocks: OcrExtractionTextBlock[];
  draft: UploadExtractionDraft;
  message: string;
};

export type OcrProviderFailure = {
  success: false;
  status: OcrProviderStatus;
  input: OcrInputReference;
  message: string;
};

export type OcrProviderResult = OcrProviderSuccess | OcrProviderFailure;

export type OcrProvider = {
  key: string;
  label: string;
  description: string;
  storesOriginalImage: false;
  requiresUserReview: true;
  run: () => Promise<OcrProviderResult>;
};

export const createTemporaryOcrInputReference = (
  source: OcrInputReference["source"]
): OcrInputReference => {
  return {
    source,
    temporaryOnly: true,
    fileNameStored: false,
    fileSizeStored: false,
    originalImageStored: false,
  };
};