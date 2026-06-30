import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";

export type AnalyzerInputSource = "manual" | "upload" | "scan";

export type LabelReviewDraft = ManualAnalyzerState & {
  source: AnalyzerInputSource;
  confidenceNotes: string[];
};

export const createEmptyLabelReviewDraft = (
  source: AnalyzerInputSource
): LabelReviewDraft => {
  return {
    source,
    confidenceNotes: [],
    productName: "",
    brandName: "",
    category: "",
    servingSizeGrams: "",
    packSizeGrams: "",
    calories: "",
    sugarGrams: "",
    sodiumMg: "",
    totalFatGrams: "",
    saturatedFatGrams: "",
    proteinGrams: "",
    fiberGrams: "",
    ingredients: "",
    claims: "",
  };
};

export const createDraftFromManualState = (
  state: ManualAnalyzerState,
  source: AnalyzerInputSource
): LabelReviewDraft => {
  return {
    ...state,
    source,
    confidenceNotes: [],
  };
};