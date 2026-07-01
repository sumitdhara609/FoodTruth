import {
  createTemporaryOcrInputReference,
  type OcrProvider,
  type OcrProviderResult,
} from "@/lib/analyze/ocr-provider-contract";

export const ocrUnavailableProvider: OcrProvider = {
  key: "ocr-unavailable",
  label: "OCR provider unavailable",
  description:
    "Represents the future OCR integration while image extraction is not active.",
  storesOriginalImage: false,
  requiresUserReview: true,
  run: async (): Promise<OcrProviderResult> => {
    return {
      success: false,
      status: "Unavailable",
      input: createTemporaryOcrInputReference("upload"),
      message:
        "OCR extraction is not active yet. Use the review form or extraction draft while the provider is unavailable.",
    };
  },
};