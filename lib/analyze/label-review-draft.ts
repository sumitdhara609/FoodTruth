import {
  buildFoodLabelInputFromManualState,
  type ManualAnalyzerState,
} from "@/lib/analyze/manual-input-adapter";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import type { FoodLabelInput, ValidatedFoodTruthResult } from "@/lib/engine/types";

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

export const buildFoodLabelInputFromDraft = (
  draft: LabelReviewDraft
): FoodLabelInput => {
  return buildFoodLabelInputFromManualState(draft);
};

export const generateValidatedReportFromDraft = (
  draft: LabelReviewDraft
): ValidatedFoodTruthResult => {
  return generateValidatedFoodTruthReport(buildFoodLabelInputFromDraft(draft));
};