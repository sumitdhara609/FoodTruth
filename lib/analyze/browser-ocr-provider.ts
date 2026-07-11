import { createClassifiedOcrTextBlock } from "@/lib/analyze/ocr-text-classifier";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";
import type { UploadImageInput } from "@/lib/analyze/upload-image-input";

import { preprocessImage } from "@/lib/analyze/image-preprocessor/pipeline";
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
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(createClassifiedOcrTextBlock);
};

export const runBrowserOcrExtraction = async (
  input: BrowserOcrInput
): Promise<OcrTextResult> => {
  let worker: Awaited<
    ReturnType<typeof import("tesseract.js")["createWorker"]>
  > | null = null;

  try {
    const { createWorker } = await import("tesseract.js");

    worker = await createWorker(browserOcrProviderConfig.language);

    // -----------------------------
    // Convert image
    // -----------------------------

    const imageData = await imageToImageData(input.image);

    console.log("===== ORIGINAL IMAGE =====");
    console.log(imageData.width, imageData.height);

    // -----------------------------
    // Preprocess
    // -----------------------------

    console.log("STEP 1");

console.log("CALLING preprocessImage");

const preprocessing = await preprocessImage(imageData);

console.log("RETURNED preprocessImage");

console.log("STEP 2");

    console.log("===== PREPROCESSING =====");
    console.log(preprocessing);

    // -----------------------------
    // OCR on processed image
    // -----------------------------

    const processedBlob = await imageDataToBlob(
      preprocessing.processed
    );

    let recognition = await worker.recognize(processedBlob);

    let recognizedText = recognition.data.text.trim();

    console.log("===== OCR (Processed) =====");
    console.log(recognizedText);

    // -----------------------------
    // Fallback to original image
    // -----------------------------

    if (!recognizedText) {
      console.log("Processed image produced no text.");
      console.log("Retrying with original image...");

      const originalBlob = await imageDataToBlob(imageData);

      recognition = await worker.recognize(originalBlob);

      recognizedText = recognition.data.text.trim();

      console.log("===== OCR (Original) =====");
      console.log(recognizedText);
    }

    // -----------------------------
    // Final result
    // -----------------------------

    if (!recognizedText) {
      return {
        source: input.source,
        provider: "browser",
        success: false,
        blocks: [],
        message:
          "OCR completed but no readable text could be extracted from either the processed or original image.",
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
        "Browser OCR successfully extracted text. Please verify the detected values before generating the report.",
      storesOriginalImage: false,
      requiresUserReview: true,
    };
  } catch (error) {
    console.error("===== OCR ERROR =====");
    console.error(error);

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