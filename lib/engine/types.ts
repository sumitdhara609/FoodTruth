export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

export type FoodTruthGrade =
  | "Excellent Label Clarity"
  | "Good, with Minor Concerns"
  | "Mixed Profile"
  | "High Concern"
  | "Very High Concern";

export type FoodLabelInput = {
  productName: string;
  brandName?: string;
  category?: string;

  servingSizeGrams: number;
  packSizeGrams: number;

  calories: number;
  sugarGrams: number;
  sodiumMg: number;
  totalFatGrams: number;
  saturatedFatGrams: number;
  proteinGrams: number;
  fiberGrams: number;

  ingredients: string;
  claims: string[];
};

export type NutritionLoadResult = {
  sugarLoad: RiskLevel;
  sodiumLoad: RiskLevel;
  saturatedFatLoad: RiskLevel;
  calorieDensity: RiskLevel;
  fiberSupport: "Weak" | "Moderate" | "Good";
  proteinSupport: "Weak" | "Moderate" | "Good";
};

export type IngredientClarityResult = {
  primaryIngredient: string | null;
  ingredientCount: number;
  sugarAliasesDetected: string[];
  additiveIndicatorsDetected: string[];
  ingredientComplexity: RiskLevel;
};

export type ClaimRiskResult = {
  overallRisk: RiskLevel;
  flaggedClaims: {
    claim: string;
    risk: RiskLevel;
    reason: string;
  }[];
};

export type ServingSizeRealityResult = {
  servingsPerPack: number;
  risk: RiskLevel;
  reason: string;
};

export type FoodTruthReport = {
  productName: string;
  score: number;
  grade: FoodTruthGrade;
  riskLevel: RiskLevel;

  nutritionLoad: NutritionLoadResult;
  ingredientClarity: IngredientClarityResult;
  claimRisk: ClaimRiskResult;
  servingSizeReality: ServingSizeRealityResult;

  summary: string;
  betterChoiceChecklist: string[];
};

export type FoodTruthValidationError = {
  field: string;
  message: string;
};

export type ValidatedFoodTruthResult =
  | {
      success: true;
      report: FoodTruthReport;
    }
  | {
      success: false;
      errors: FoodTruthValidationError[];
    };