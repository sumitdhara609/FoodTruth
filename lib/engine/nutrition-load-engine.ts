import type { FoodLabelInput, NutritionLoadResult, RiskLevel } from "./types";

const roundToOneDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
};

const normalizePer100g = (valuePerServing: number, servingSizeGrams: number): number => {
  if (servingSizeGrams <= 0) {
    return 0;
  }

  return roundToOneDecimal((valuePerServing / servingSizeGrams) * 100);
};

const classifySugarLoad = (sugarPer100g: number): RiskLevel => {
  if (sugarPer100g >= 22.5) return "High";
  if (sugarPer100g >= 5) return "Moderate";
  return "Low";
};

const classifySodiumLoad = (sodiumPer100g: number): RiskLevel => {
  if (sodiumPer100g >= 600) return "High";
  if (sodiumPer100g >= 120) return "Moderate";
  return "Low";
};

const classifySaturatedFatLoad = (saturatedFatPer100g: number): RiskLevel => {
  if (saturatedFatPer100g >= 5) return "High";
  if (saturatedFatPer100g >= 1.5) return "Moderate";
  return "Low";
};

const classifyCalorieDensity = (caloriesPer100g: number): RiskLevel => {
  if (caloriesPer100g >= 400) return "High";
  if (caloriesPer100g >= 150) return "Moderate";
  return "Low";
};

const classifyFiberSupport = (fiberPer100g: number): NutritionLoadResult["fiberSupport"] => {
  if (fiberPer100g >= 6) return "Good";
  if (fiberPer100g >= 3) return "Moderate";
  return "Weak";
};

const classifyProteinSupport = (proteinPer100g: number): NutritionLoadResult["proteinSupport"] => {
  if (proteinPer100g >= 12) return "Good";
  if (proteinPer100g >= 6) return "Moderate";
  return "Weak";
};

export const analyzeNutritionLoad = (
  input: FoodLabelInput
): NutritionLoadResult => {
  const sugarPer100g = normalizePer100g(
    input.sugarGrams,
    input.servingSizeGrams
  );

  const sodiumPer100g = normalizePer100g(
    input.sodiumMg,
    input.servingSizeGrams
  );

  const saturatedFatPer100g = normalizePer100g(
    input.saturatedFatGrams,
    input.servingSizeGrams
  );

  const caloriesPer100g = normalizePer100g(
    input.calories,
    input.servingSizeGrams
  );

  const fiberPer100g = normalizePer100g(
    input.fiberGrams,
    input.servingSizeGrams
  );

  const proteinPer100g = normalizePer100g(
    input.proteinGrams,
    input.servingSizeGrams
  );

  return {
    sugarLoad: classifySugarLoad(sugarPer100g),
    sodiumLoad: classifySodiumLoad(sodiumPer100g),
    saturatedFatLoad: classifySaturatedFatLoad(saturatedFatPer100g),
    calorieDensity: classifyCalorieDensity(caloriesPer100g),
    fiberSupport: classifyFiberSupport(fiberPer100g),
    proteinSupport: classifyProteinSupport(proteinPer100g),
  };
};