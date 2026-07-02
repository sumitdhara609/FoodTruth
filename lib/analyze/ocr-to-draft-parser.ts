import {
  createExtractionDraftField,
  type ExtractionDraftConfidence,
  type UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";

const findBlockText = (result: OcrTextResult, kind: string) => {
  return (
    result.blocks.find((block) => block.kind === kind)?.text.toLowerCase() ?? ""
  );
};

const findNumberAfterLabel = (text: string, label: string) => {
  const pattern = new RegExp(`${label}\\s*([0-9]+(?:\\.[0-9]+)?)`, "i");
  const match = text.match(pattern);

  return match?.[1] ?? "";
};

const mapConfidence = (
  confidence: ExtractionDraftConfidence
): ExtractionDraftConfidence => {
  return confidence;
};

export const parseOcrTextToExtractionDraft = (
  result: OcrTextResult
): UploadExtractionDraft => {
  const servingText = findBlockText(result, "serving");
  const nutritionText = findBlockText(result, "nutrition");
  const ingredientBlock = result.blocks.find(
    (block) => block.kind === "ingredients"
  );
  const claimsBlock = result.blocks.find((block) => block.kind === "claims");

  const servingSize = findNumberAfterLabel(servingText, "serving size:");
  const servingsPerPack = findNumberAfterLabel(servingText, "servings per pack:");
  const packSize =
    servingSize && servingsPerPack
      ? String(Number(servingSize) * Number(servingsPerPack))
      : "";

  return {
    productName: createExtractionDraftField({
      value: "Uploaded label draft",
      confidence: "Unknown",
      source: "ocr",
    }),
    brandName: createExtractionDraftField({
      value: "",
      confidence: "Unknown",
      source: "ocr",
    }),
    category: createExtractionDraftField({
      value: "Packaged food",
      confidence: "Medium",
      source: "ocr",
    }),
    servingSizeGrams: createExtractionDraftField({
      value: servingSize,
      confidence: servingSize ? "High" : "Unknown",
      source: "ocr",
    }),
    packSizeGrams: createExtractionDraftField({
      value: packSize,
      confidence: packSize ? "Medium" : "Unknown",
      source: "ocr",
    }),
    calories: createExtractionDraftField({
      value: findNumberAfterLabel(nutritionText, "energy"),
      confidence: "High",
      source: "ocr",
    }),
    sugarGrams: createExtractionDraftField({
      value: findNumberAfterLabel(nutritionText, "sugar"),
      confidence: "High",
      source: "ocr",
    }),
    sodiumMg: createExtractionDraftField({
      value: findNumberAfterLabel(nutritionText, "sodium"),
      confidence: "High",
      source: "ocr",
    }),
    totalFatGrams: createExtractionDraftField({
      value: findNumberAfterLabel(nutritionText, "total fat"),
      confidence: "High",
      source: "ocr",
    }),
    saturatedFatGrams: createExtractionDraftField({
      value: findNumberAfterLabel(nutritionText, "saturated fat"),
      confidence: "High",
      source: "ocr",
    }),
    proteinGrams: createExtractionDraftField({
      value: findNumberAfterLabel(nutritionText, "protein"),
      confidence: "High",
      source: "ocr",
    }),
    fiberGrams: createExtractionDraftField({
      value: findNumberAfterLabel(nutritionText, "fiber"),
      confidence: "High",
      source: "ocr",
    }),
    ingredients: createExtractionDraftField({
      value: ingredientBlock?.text ?? "",
      confidence: mapConfidence(ingredientBlock?.confidence ?? "Unknown"),
      source: "ocr",
    }),
    claims: createExtractionDraftField({
      value: claimsBlock?.text ?? "",
      confidence: mapConfidence(claimsBlock?.confidence ?? "Unknown"),
      source: "ocr",
    }),
  };
};