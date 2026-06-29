import type { FoodLabelInput } from "@/lib/engine/types";

export type ManualAnalyzerState = {
  productName: string;
  brandName: string;
  category: string;
  servingSizeGrams: string;
  packSizeGrams: string;
  calories: string;
  sugarGrams: string;
  sodiumMg: string;
  totalFatGrams: string;
  saturatedFatGrams: string;
  proteinGrams: string;
  fiberGrams: string;
  ingredients: string;
  claims: string;
};

export const toNumber = (value: string) => {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : Number.NaN;
};

export const splitClaims = (claims: string) => {
  return claims
    .split(",")
    .map((claim) => claim.trim())
    .filter(Boolean);
};

export const buildFoodLabelInputFromManualState = (
  state: ManualAnalyzerState
): FoodLabelInput => {
  return {
    productName: state.productName,
    brandName: state.brandName || undefined,
    category: state.category || undefined,
    servingSizeGrams: toNumber(state.servingSizeGrams),
    packSizeGrams: toNumber(state.packSizeGrams),
    calories: toNumber(state.calories),
    sugarGrams: toNumber(state.sugarGrams),
    sodiumMg: toNumber(state.sodiumMg),
    totalFatGrams: toNumber(state.totalFatGrams),
    saturatedFatGrams: toNumber(state.saturatedFatGrams),
    proteinGrams: toNumber(state.proteinGrams),
    fiberGrams: toNumber(state.fiberGrams),
    ingredients: state.ingredients,
    claims: splitClaims(state.claims),
  };
};