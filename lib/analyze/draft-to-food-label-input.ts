import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";
import type { FoodLabelInput } from "@/lib/engine/types";

const toNumber = (value: string): number => {
  const normalized = value.trim().replace(",", ".");

  if (!normalized) {
    return 0;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
};

const toClaimsArray = (claims: string): string[] => {
  return claims
    .split(/\r?\n|,/)
    .map((claim) => claim.trim())
    .filter(Boolean);
};

export const mapDraftToFoodLabelInput = (
  draft: UploadExtractionDraft
): FoodLabelInput => {
  return {
    productName: draft.productName.value.trim(),
    brandName: draft.brandName.value.trim(),
    category: draft.category.value.trim(),

    servingSizeGrams: toNumber(draft.servingSizeGrams.value),
    packSizeGrams: toNumber(draft.packSizeGrams.value),

    calories: toNumber(draft.calories.value),
    sugarGrams: toNumber(draft.sugarGrams.value),
    sodiumMg: toNumber(draft.sodiumMg.value),
    totalFatGrams: toNumber(draft.totalFatGrams.value),
    saturatedFatGrams: toNumber(draft.saturatedFatGrams.value),
    proteinGrams: toNumber(draft.proteinGrams.value),
    fiberGrams: toNumber(draft.fiberGrams.value),

    ingredients: draft.ingredients.value.trim(),

    claims: toClaimsArray(draft.claims.value),
  };
};