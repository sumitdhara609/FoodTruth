import { createClassifiedOcrTextBlock } from "@/lib/analyze/ocr-text-classifier";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";
import type { UploadImageInput } from "@/lib/analyze/upload-image-input";

import { preprocessImage } from "@/lib/analyze/image-preprocessor";
import {
  imageToImageData,
  imageDataToBlob,
} from "@/lib/analyze/image-preprocessor/image-utils";

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

const splitRecognizedTextIntoBlocks = (
  text: string
): OcrTextResult["blocks"] => {
  const normalizedLines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return normalizedLines.map(createClassifiedOcrTextBlock);
};

export const runBrowserOcrExtraction = async (
  input: BrowserOcrInput
): Promise<OcrTextResult> => {
  let worker: Awaited<ReturnType<typeof import("tesseract.js")["createWorker"]>> | null =
    null;

  try {
    const { createWorker } = await import("tesseract.js");

    worker = await createWorker(browserOcrProviderConfig.language);

    // -----------------------------
    // Preprocess image
    // -----------------------------

    const imageData = await imageToImageData(input.image);

    const preprocessing = await preprocessImage(imageData);

    const processedBlob = await imageDataToBlob(
      preprocessing.processed
    );

    // -----------------------------
    // OCR
    // -----------------------------

    const recognition = await worker.recognize(processedBlob);

    const recognizedText = recognition.data.text.trim();

    if (!recognizedText) {
      return {
        source: input.source,
        provider: "browser",
        success: false,
        blocks: [],
        message:
          "OCR completed but no readable text was detected. Try a clearer image with better lighting.",
        storesOriginalImage: false,
        requiresUserReview: true,
      };
    }

    return {
      source: input.source,
      provider: "browser",
      success: true,
      blocks: splitRecognizedTextIntoBlocks(recognizedText),
      message:
        "Browser OCR successfully extracted text from the processed food label. Please review the detected values before generating the report.",
      storesOriginalImage: false,
      requiresUserReview: true,
    };
  } catch (error) {
    console.error("Browser OCR failed:", error);

    return {
      source: input.source,
      provider: "browser",
      success: false,
      blocks: [],
      message:
        error instanceof Error
          ? error.message
          : "Browser OCR failed unexpectedly.",
      storesOriginalImage: false,
      requiresUserReview: true,
    };
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
};