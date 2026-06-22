import type { ClaimRiskResult, FoodLabelInput, RiskLevel } from "./types";
import { analyzeIngredientClarity } from "./ingredient-clarity-engine";
import { analyzeNutritionLoad } from "./nutrition-load-engine";

const normalizeClaim = (claim: string): string => {
  return claim.trim().toLowerCase();
};

const getHighestRisk = (risks: RiskLevel[]): RiskLevel => {
  if (risks.includes("Critical")) return "Critical";
  if (risks.includes("High")) return "High";
  if (risks.includes("Moderate")) return "Moderate";

  return "Low";
};

const createFlag = (claim: string, risk: RiskLevel, reason: string) => ({
  claim,
  risk,
  reason,
});

export const analyzeClaimRisk = (input: FoodLabelInput): ClaimRiskResult => {
  const nutritionLoad = analyzeNutritionLoad(input);
  const ingredientClarity = analyzeIngredientClarity(input);

  const flaggedClaims = input.claims
    .map(normalizeClaim)
    .filter(Boolean)
    .flatMap((claim) => {
      if (claim.includes("healthy") || claim.includes("better for you")) {
        if (
          nutritionLoad.sugarLoad === "High" ||
          nutritionLoad.saturatedFatLoad === "High" ||
          ingredientClarity.ingredientComplexity === "High"
        ) {
          return [
            createFlag(
              claim,
              "High",
              "This health-oriented claim may need closer verification because the label shows one or more high nutrition or ingredient-complexity concerns."
            ),
          ];
        }

        return [
          createFlag(
            claim,
            "Moderate",
            "This health-oriented claim should be read with the full nutrition and ingredient profile."
          ),
        ];
      }

      if (claim.includes("high fiber") || claim.includes("fiber rich")) {
        if (nutritionLoad.fiberSupport === "Weak") {
          return [
            createFlag(
              claim,
              "High",
              "The claim suggests strong fiber value, but the fiber support appears weak based on the label values."
            ),
          ];
        }

        if (nutritionLoad.fiberSupport === "Moderate") {
          return [
            createFlag(
              claim,
              "Moderate",
              "The fiber claim has some support, but the label does not show a strong fiber profile."
            ),
          ];
        }

        return [];
      }

      if (claim.includes("high protein") || claim.includes("protein rich")) {
        if (nutritionLoad.proteinSupport === "Weak") {
          return [
            createFlag(
              claim,
              "High",
              "The claim suggests strong protein value, but the protein support appears weak based on the label values."
            ),
          ];
        }

        if (nutritionLoad.proteinSupport === "Moderate") {
          return [
            createFlag(
              claim,
              "Moderate",
              "The protein claim has some support, but the label does not show a strong protein profile."
            ),
          ];
        }

        return [];
      }

      if (claim.includes("energy")) {
        if (nutritionLoad.sugarLoad === "High") {
          return [
            createFlag(
              claim,
              "Moderate",
              "Energy-focused claims may be relying on a high sugar load, so the nutrition panel should be checked carefully."
            ),
          ];
        }

        return [];
      }

      if (claim.includes("natural")) {
        if (
          ingredientClarity.additiveIndicatorsDetected.length > 0 ||
          ingredientClarity.ingredientComplexity !== "Low"
        ) {
          return [
            createFlag(
              claim,
              "Moderate",
              "Natural claims may need closer review when the ingredient list contains additive indicators or higher complexity."
            ),
          ];
        }

        return [];
      }

      if (claim.includes("no added sugar")) {
        if (ingredientClarity.sugarAliasesDetected.length > 0) {
          return [
            createFlag(
              claim,
              "High",
              "The label includes sugar-related ingredients, so this claim may require closer interpretation."
            ),
          ];
        }

        return [];
      }

      if (claim.includes("low fat")) {
        if (
          nutritionLoad.saturatedFatLoad === "High" ||
          nutritionLoad.saturatedFatLoad === "Moderate"
        ) {
          return [
            createFlag(
              claim,
              "Moderate",
              "The low-fat claim should be checked against the saturated fat value shown on the nutrition label."
            ),
          ];
        }

        return [];
      }

      if (
        claim.includes("kids") ||
        claim.includes("fitness") ||
        claim.includes("immunity")
      ) {
        return [
          createFlag(
            claim,
            "Moderate",
            "This claim uses audience or benefit-oriented language and should be interpreted with the full label context."
          ),
        ];
      }

      return [];
    });

  return {
    overallRisk:
      flaggedClaims.length > 0
        ? getHighestRisk(flaggedClaims.map((flag) => flag.risk))
        : "Low",
    flaggedClaims,
  };
};