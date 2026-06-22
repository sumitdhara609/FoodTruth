import type {
  FoodLabelInput,
  FoodTruthGrade,
  FoodTruthReport,
  RiskLevel,
} from "./types";
import { analyzeClaimRisk } from "./claim-risk-engine";
import { analyzeIngredientClarity } from "./ingredient-clarity-engine";
import { analyzeNutritionLoad } from "./nutrition-load-engine";
import { analyzeServingSizeReality } from "./serving-size-engine";

const riskPenalty: Record<RiskLevel, number> = {
  Low: 0,
  Moderate: 8,
  High: 18,
  Critical: 28,
};

const supportPenalty = {
  Weak: 10,
  Moderate: 4,
  Good: 0,
};

const clampScore = (score: number): number => {
  return Math.max(0, Math.min(100, Math.round(score)));
};

const getGrade = (score: number): FoodTruthGrade => {
  if (score >= 85) return "Excellent Label Clarity";
  if (score >= 70) return "Good, with Minor Concerns";
  if (score >= 50) return "Mixed Profile";
  if (score >= 30) return "High Concern";
  return "Very High Concern";
};

const getOverallRiskLevel = (score: number): RiskLevel => {
  if (score < 30) return "Critical";
  if (score < 50) return "High";
  if (score < 70) return "Moderate";
  return "Low";
};

const calculateFoodTruthScore = (
  nutritionLoad: FoodTruthReport["nutritionLoad"],
  ingredientClarity: FoodTruthReport["ingredientClarity"],
  claimRisk: FoodTruthReport["claimRisk"],
  servingSizeReality: FoodTruthReport["servingSizeReality"]
): number => {
  const rawScore =
    100 -
    riskPenalty[nutritionLoad.sugarLoad] -
    riskPenalty[nutritionLoad.sodiumLoad] -
    riskPenalty[nutritionLoad.saturatedFatLoad] -
    riskPenalty[nutritionLoad.calorieDensity] -
    supportPenalty[nutritionLoad.fiberSupport] -
    supportPenalty[nutritionLoad.proteinSupport] -
    riskPenalty[ingredientClarity.ingredientComplexity] -
    riskPenalty[claimRisk.overallRisk] -
    riskPenalty[servingSizeReality.risk];

  return clampScore(rawScore);
};

const buildSummary = (
  input: FoodLabelInput,
  report: Omit<FoodTruthReport, "summary" | "betterChoiceChecklist">
): string => {
  const concerns: string[] = [];

  if (report.nutritionLoad.sugarLoad === "High") {
    concerns.push("high sugar density");
  }

  if (report.nutritionLoad.sodiumLoad === "High") {
    concerns.push("high sodium load");
  }

  if (report.nutritionLoad.saturatedFatLoad === "High") {
    concerns.push("high saturated fat load");
  }

  if (report.ingredientClarity.ingredientComplexity !== "Low") {
    concerns.push("ingredient complexity");
  }

  if (report.claimRisk.overallRisk !== "Low") {
    concerns.push("marketing claims that may need closer verification");
  }

  if (report.servingSizeReality.risk !== "Low") {
    concerns.push("serving-size framing that may affect interpretation");
  }

  if (concerns.length === 0) {
    return `${input.productName} shows a relatively clear label profile based on the current FoodTruth analysis. The nutrition load, ingredient list, claims, and serving-size framing do not show major label-literacy concerns.`;
  }

  return `${input.productName} shows ${concerns.join(
  ", "
)}. This report is for label literacy only and suggests that the label may need closer reading before purchase.`;
};

const buildBetterChoiceChecklist = (
  report: Omit<FoodTruthReport, "summary" | "betterChoiceChecklist">
): string[] => {
  const checklist: string[] = [];

  if (report.nutritionLoad.sugarLoad !== "Low") {
    checklist.push("Compare sugar per 100g/ml, not only per serving.");
  }

  if (report.nutritionLoad.sodiumLoad !== "Low") {
    checklist.push("Check sodium load against similar products in the same category.");
  }

  if (report.nutritionLoad.fiberSupport === "Weak") {
    checklist.push("Look for stronger fiber support if the product is positioned as filling or wholesome.");
  }

  if (report.nutritionLoad.proteinSupport === "Weak") {
    checklist.push("Check whether protein-related claims are meaningfully supported.");
  }

  if (report.ingredientClarity.sugarAliasesDetected.length > 0) {
    checklist.push("Review sugar aliases in the ingredient list.");
  }

  if (report.ingredientClarity.additiveIndicatorsDetected.length > 0) {
    checklist.push("Review additive indicators and decide whether the label is transparent enough for you.");
  }

  if (report.claimRisk.flaggedClaims.length > 0) {
    checklist.push("Read front-label claims together with the nutrition panel and ingredient list.");
  }

  if (report.servingSizeReality.risk !== "Low") {
    checklist.push("Check how many servings are in the full pack before judging the nutrition values.");
  }

  if (checklist.length === 0) {
    checklist.push("Compare this product with similar options to confirm label clarity.");
  }

  return checklist;
};

export const generateFoodTruthReport = (
  input: FoodLabelInput
): FoodTruthReport => {
  const nutritionLoad = analyzeNutritionLoad(input);
  const ingredientClarity = analyzeIngredientClarity(input);
  const claimRisk = analyzeClaimRisk(input);
  const servingSizeReality = analyzeServingSizeReality(input);

  const score = calculateFoodTruthScore(
    nutritionLoad,
    ingredientClarity,
    claimRisk,
    servingSizeReality
  );

  const reportWithoutText = {
    productName: input.productName,
    score,
    grade: getGrade(score),
    riskLevel: getOverallRiskLevel(score),
    nutritionLoad,
    ingredientClarity,
    claimRisk,
    servingSizeReality,
  };

  return {
    ...reportWithoutText,
    summary: buildSummary(input, reportWithoutText),
    betterChoiceChecklist: buildBetterChoiceChecklist(reportWithoutText),
  };
};