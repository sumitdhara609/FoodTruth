import {
  createExtractionDraftField,
  type ExtractionDraftConfidence,
  type UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";

import { runParserPipeline } from "./parser-orchestrator";

const UNKNOWN = {
  value: "",
  confidence: "Unknown" as ExtractionDraftConfidence,
};

export async function buildExtractionDraft(
  rawText: string
): Promise<UploadExtractionDraft> {
  const result = await runParserPipeline(rawText);

  console.log("=== RAW OCR TEXT ===");
console.log(rawText);

console.log("=== PARSER RESULT ===");
console.log(result);
  const nutrition = {
    calories: result.nutrition.calories ?? UNKNOWN,
    sugarGrams: result.nutrition.sugarGrams ?? UNKNOWN,
    sodiumMg: result.nutrition.sodiumMg ?? UNKNOWN,
    totalFatGrams: result.nutrition.totalFatGrams ?? UNKNOWN,
    saturatedFatGrams:
      result.nutrition.saturatedFatGrams ?? UNKNOWN,
    proteinGrams: result.nutrition.proteinGrams ?? UNKNOWN,
    fiberGrams: result.nutrition.fiberGrams ?? UNKNOWN,
  };

  const servingSize = result.serving.servingSize ?? "";
  const servingsPerPack = result.serving.servingsPerPack ?? "";

  const servingNumber = Number(servingSize);
  const servingsNumber = Number(servingsPerPack);

  const packSize =
    Number.isFinite(servingNumber) &&
    Number.isFinite(servingsNumber)
      ? String(servingNumber * servingsNumber)
      : "";

  return {
    productName: createExtractionDraftField({
      value: result.product.productName,
      confidence: "High",
      source: "ocr",
    }),

    brandName: createExtractionDraftField({
      value: result.product.brandName,
      confidence: "Medium",
      source: "ocr",
    }),

    category: createExtractionDraftField({
      value: result.product.category,
      confidence: "Medium",
      source: "ocr",
    }),

    servingSizeGrams: createExtractionDraftField({
      value: servingSize,
      confidence: "High",
      source: "ocr",
    }),

    packSizeGrams: createExtractionDraftField({
      value: packSize,
      confidence: packSize ? "Medium" : "Unknown",
      source: "ocr",
    }),

    calories: createExtractionDraftField({
      value: nutrition.calories.value,
      confidence: nutrition.calories.confidence,
      source: "ocr",
    }),

    sugarGrams: createExtractionDraftField({
      value: nutrition.sugarGrams.value,
      confidence: nutrition.sugarGrams.confidence,
      source: "ocr",
    }),

    sodiumMg: createExtractionDraftField({
      value: nutrition.sodiumMg.value,
      confidence: nutrition.sodiumMg.confidence,
      source: "ocr",
    }),

    totalFatGrams: createExtractionDraftField({
      value: nutrition.totalFatGrams.value,
      confidence: nutrition.totalFatGrams.confidence,
      source: "ocr",
    }),

    saturatedFatGrams: createExtractionDraftField({
      value: nutrition.saturatedFatGrams.value,
      confidence: nutrition.saturatedFatGrams.confidence,
      source: "ocr",
    }),

    proteinGrams: createExtractionDraftField({
      value: nutrition.proteinGrams.value,
      confidence: nutrition.proteinGrams.confidence,
      source: "ocr",
    }),

    fiberGrams: createExtractionDraftField({
      value: nutrition.fiberGrams.value,
      confidence: nutrition.fiberGrams.confidence,
      source: "ocr",
    }),

    ingredients: createExtractionDraftField({
      value: result.ingredients,
      confidence: result.ingredients ? "Medium" : "Unknown",
      source: "ocr",
    }),

    claims: createExtractionDraftField({
      value: result.claims.join(", "),
      confidence:
        result.claims.length > 0 ? "Medium" : "Unknown",
      source: "ocr",
    }),
  };
}