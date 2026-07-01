import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";
import { realLabelUploadExtractionDraft } from "@/lib/analyze/upload-review-sample";

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

export const runMockUploadExtraction =
  async (): Promise<ExtractionProviderResult> => {
    return {
      success: true,
      status: "Mock",
      draft: realLabelUploadExtractionDraft,
      message:
        "Extraction draft created. Review the values before generating a report.",
    };
  };