import Tesseract from "tesseract.js";

export type BrowserOcrSuccess = {
  success: true;
  text: string;
  confidence: number;
  language: string;
};

export type BrowserOcrFailure = {
  success: false;
  message: string;
};

export type BrowserOcrResult =
  | BrowserOcrSuccess
  | BrowserOcrFailure;

export async function runBrowserOcrEngine(
  file: File
): Promise<BrowserOcrResult> {
  try {
    const result = await Tesseract.recognize(file, "eng");

    return {
      success: true,
      text: result.data.text,
      confidence: result.data.confidence,
      language: "eng",
    };
  } catch {
    return {
      success: false,
      message: "Unable to extract text from the uploaded image.",
    };
  }
}