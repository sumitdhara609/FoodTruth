import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";

export const mockUploadOcrTextResult: OcrTextResult = {
  source: "upload",
  provider: "mock",
  success: true,
  storesOriginalImage: false,
  requiresUserReview: true,
  message:
    "Mock OCR text extracted from a packaged-food label. Review is required before report generation.",
  blocks: [
    {
      kind: "serving",
      confidence: "High",
      text: "Serving size: 25g. Servings per pack: 16.",
    },
    {
      kind: "nutrition",
      confidence: "High",
      text: "Energy 126.91 kcal. Total fat 6.10g. Saturated fat 2.70g. Sugar 9.68g. Sodium 2.22mg. Protein 1.69g. Fiber 0.72g.",
    },
    {
      kind: "ingredients",
      confidence: "Low",
      text: "Ingredients not clearly visible.",
    },
    {
      kind: "claims",
      confidence: "Medium",
      text: "No visible front-label claims detected.",
    },
  ],
};