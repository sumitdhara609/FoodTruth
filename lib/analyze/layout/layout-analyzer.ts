import { cleanOcr } from "@/lib/analyze/ocr-cleaner";

import { detectSections } from "./section-detector";

import type { LayoutDocument } from "./types";

export async function analyzeLayout(
  rawOcrText: string
): Promise<LayoutDocument> {

  // ---------------------------------
  // OCR Cleaning
  // ---------------------------------

  const cleaned = cleanOcr(rawOcrText);

  console.log("========== OCR CLEANER ==========");
  console.log(cleaned);

  // ---------------------------------
  // Layout Detection
  // ---------------------------------

  const document = detectSections(
    rawOcrText,
    cleaned.cleaned
  );

  console.log("========== LAYOUT ==========");
  console.log(document);

  return document;

}