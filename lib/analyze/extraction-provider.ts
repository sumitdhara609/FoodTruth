import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";
import { parseOcrTextToExtractionDraft } from "@/lib/analyze/ocr-to-draft-parser";
import { runMockUploadOcrTextExtraction } from "@/lib/analyze/ocr-text-provider";
import {
  createUploadImageInput,
  type UploadImageMimeType,
} from "@/lib/analyze/upload-image-input";

export type ExtractionProviderStatus = "Mock" | "Ready" | "Unavailable";

export type ExtractionProviderResult =
  | {
      success: true;
      status: ExtractionProviderStatus;
      draft: UploadExtractionDraft;
      message: string;
    }
  | {
      success: false;
      status: ExtractionProviderStatus;
      message: string;
    };

export const extractionProviderConfig = {
  activeProvider: "mock",
  storesOriginalImage: false,
  requiresUserReview: true,
  directImageToReport: false,
} as const;

export const runMockUploadExtraction = async (
  mimeType: UploadImageMimeType = "image/jpeg"
): Promise<ExtractionProviderResult> => {
  const uploadInput = createUploadImageInput(mimeType);
  const ocrTextResult = await runMockUploadOcrTextExtraction(uploadInput);

  if (!ocrTextResult.success) {
    return {
      success: false,
      status: "Unavailable",
      message: ocrTextResult.message,
    };
  }

  return {
    success: true,
    status: "Mock",
    draft: parseOcrTextToExtractionDraft(ocrTextResult),
    message:
      "Upload input converted into OCR text and extraction draft. Review the values before generating a report.",
  };
};