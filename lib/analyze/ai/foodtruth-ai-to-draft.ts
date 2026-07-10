import {
  createExtractionDraftField,
  type UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";
import type { FoodLabelAiResult } from "./types";

export function mapAiResultToDraft(
  ai: FoodLabelAiResult
): UploadExtractionDraft {
  return {
    productName: createExtractionDraftField({
      value: ai.product.productName?.value ?? "",
      confidence: ai.product.productName?.confidence ?? "Unknown",
      source: "ocr",
    }),

    brandName: createExtractionDraftField({
      value: ai.product.brandName?.value ?? "",
      confidence: ai.product.brandName?.confidence ?? "Unknown",
      source: "ocr",
    }),

    category: createExtractionDraftField({
      value: ai.product.category?.value ?? "",
      confidence: ai.product.category?.confidence ?? "Unknown",
      source: "ocr",
    }),

    servingSizeGrams: createExtractionDraftField({
      value: ai.serving.servingSizeGrams?.value ?? "",
      confidence: ai.serving.servingSizeGrams?.confidence ?? "Unknown",
      source: "ocr",
    }),

    packSizeGrams: createExtractionDraftField({
      value: ai.serving.packSizeGrams?.value ?? "",
      confidence: ai.serving.packSizeGrams?.confidence ?? "Unknown",
      source: "ocr",
    }),

    calories: createExtractionDraftField({
      value: ai.nutrition.calories?.value ?? "",
      confidence: ai.nutrition.calories?.confidence ?? "Unknown",
      source: "ocr",
    }),

    sugarGrams: createExtractionDraftField({
      value: ai.nutrition.sugarGrams?.value ?? "",
      confidence: ai.nutrition.sugarGrams?.confidence ?? "Unknown",
      source: "ocr",
    }),

    sodiumMg: createExtractionDraftField({
      value: ai.nutrition.sodiumMg?.value ?? "",
      confidence: ai.nutrition.sodiumMg?.confidence ?? "Unknown",
      source: "ocr",
    }),

    totalFatGrams: createExtractionDraftField({
      value: ai.nutrition.totalFatGrams?.value ?? "",
      confidence: ai.nutrition.totalFatGrams?.confidence ?? "Unknown",
      source: "ocr",
    }),

    saturatedFatGrams: createExtractionDraftField({
      value: ai.nutrition.saturatedFatGrams?.value ?? "",
      confidence: ai.nutrition.saturatedFatGrams?.confidence ?? "Unknown",
      source: "ocr",
    }),

    proteinGrams: createExtractionDraftField({
      value: ai.nutrition.proteinGrams?.value ?? "",
      confidence: ai.nutrition.proteinGrams?.confidence ?? "Unknown",
      source: "ocr",
    }),

    fiberGrams: createExtractionDraftField({
      value: ai.nutrition.fiberGrams?.value ?? "",
      confidence: ai.nutrition.fiberGrams?.confidence ?? "Unknown",
      source: "ocr",
    }),

    ingredients: createExtractionDraftField({
      value: ai.ingredients.ingredients?.value ?? "",
      confidence: ai.ingredients.ingredients?.confidence ?? "Unknown",
      source: "ocr",
    }),

    claims: createExtractionDraftField({
      value: ai.claims.claims?.value ?? "",
      confidence: ai.claims.claims?.confidence ?? "Unknown",
      source: "ocr",
    }),
  };
}