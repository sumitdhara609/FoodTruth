import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";

export type ExtractionDraftConfidence = "High" | "Medium" | "Low" | "Unknown";

export type ExtractionDraftField = {
  value: string;
  confidence: ExtractionDraftConfidence;
  source: "sample" | "ocr" | "user";
};

export type UploadExtractionDraft = {
  productName: ExtractionDraftField;
  brandName: ExtractionDraftField;
  category: ExtractionDraftField;
  servingSizeGrams: ExtractionDraftField;
  packSizeGrams: ExtractionDraftField;
  calories: ExtractionDraftField;
  sugarGrams: ExtractionDraftField;
  sodiumMg: ExtractionDraftField;
  totalFatGrams: ExtractionDraftField;
  saturatedFatGrams: ExtractionDraftField;
  proteinGrams: ExtractionDraftField;
  fiberGrams: ExtractionDraftField;
  ingredients: ExtractionDraftField;
  claims: ExtractionDraftField;
};

export const createExtractionDraftField = ({
  value,
  confidence = "Unknown",
  source = "user",
}: {
  value: string;
  confidence?: ExtractionDraftConfidence;
  source?: ExtractionDraftField["source"];
}): ExtractionDraftField => {
  return {
    value,
    confidence,
    source,
  };
};

export const mapExtractionDraftToManualState = (
  draft: UploadExtractionDraft
): ManualAnalyzerState => {
  return {
    productName: draft.productName.value,
    brandName: draft.brandName.value,
    category: draft.category.value,
    servingSizeGrams: draft.servingSizeGrams.value,
    packSizeGrams: draft.packSizeGrams.value,
    calories: draft.calories.value,
    sugarGrams: draft.sugarGrams.value,
    sodiumMg: draft.sodiumMg.value,
    totalFatGrams: draft.totalFatGrams.value,
    saturatedFatGrams: draft.saturatedFatGrams.value,
    proteinGrams: draft.proteinGrams.value,
    fiberGrams: draft.fiberGrams.value,
    ingredients: draft.ingredients.value,
    claims: draft.claims.value,
  };
};