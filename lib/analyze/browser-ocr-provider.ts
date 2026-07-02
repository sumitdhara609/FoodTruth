import { createClassifiedOcrTextBlock } from "@/lib/analyze/ocr-text-classifier";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";
import type { UploadImageInput } from "@/lib/analyze/upload-image-input";

export type BrowserOcrInput = {
  source: "upload";
  image: File | Blob | string;
  uploadInput: UploadImageInput;
};

export type BrowserOcrProviderConfig = {
  provider: "browser";
  language: "eng";
  storesOriginalImage: false;
  storesFileName: false;
  storesFileSize: false;
  requiresUserReview: true;
  directImageToReport: false;
};

export const browserOcrProviderConfig: BrowserOcrProviderConfig = {
  provider: "browser",
  language: "eng",
  storesOriginalImage: false,
  storesFileName: false,
  storesFileSize: false,
  requiresUserReview: true,
  directImageToReport: false,
};

const splitRecognizedTextIntoBlocks = (text: string): OcrTextResult["blocks"] => {
  const normalizedLines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (normalizedLines.length === 0) {
    return [];
  }

  return normalizedLines.map(createClassifiedOcrTextBlock);
};

export const runBrowserOcrExtraction = async (
  input: BrowserOcrInput
): Promise<OcrTextResult> => {
  try {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker(browserOcrProviderConfig.language);

    try {
      const recognitionResult = await worker.recognize(input.image);
      const recognizedText = recognitionResult.data.text.trim();

      return {
        source: input.source,
        provider: "browser",
        success: recognizedText.length > 0,
        blocks: splitRecognizedTextIntoBlocks(recognizedText),
        message:
          recognizedText.length > 0
            ? "Browser OCR extracted text from the temporary upload input. Review is required before report generation."
            : "Browser OCR could not extract readable text. Try a clearer label image.",
        storesOriginalImage: false,
        requiresUserReview: true,
      };
    } finally {
      await worker.terminate();
    }
  } catch {
    return {
      source: input.source,
      provider: "browser",
      success: false,
      blocks: [],
      message:
        "Browser OCR could not run in this environment. Use the extraction draft while OCR is being prepared.",
      storesOriginalImage: false,
      requiresUserReview: true,
    };
  }
};