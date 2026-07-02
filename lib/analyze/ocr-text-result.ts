export type OcrTextBlockKind =
  | "nutrition"
  | "ingredients"
  | "claims"
  | "serving"
  | "unknown";

export type OcrTextBlock = {
  kind: OcrTextBlockKind;
  text: string;
  confidence: "High" | "Medium" | "Low" | "Unknown";
};

export type OcrTextResult = {
  source: "upload" | "scan";
  provider: "mock" | "browser" | "external";
  success: boolean;
  blocks: OcrTextBlock[];
  message: string;
  storesOriginalImage: false;
  requiresUserReview: true;
};

export const createEmptyOcrTextResult = (
  source: OcrTextResult["source"]
): OcrTextResult => {
  return {
    source,
    provider: "mock",
    success: false,
    blocks: [],
    message:
      "No OCR text is available yet. Upload or scan input must be converted into reviewable text first.",
    storesOriginalImage: false,
    requiresUserReview: true,
  };
};