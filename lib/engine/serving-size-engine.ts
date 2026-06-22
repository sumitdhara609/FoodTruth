import type {
  FoodLabelInput,
  RiskLevel,
  ServingSizeRealityResult,
} from "./types";

const roundToOneDecimal = (value: number): number => {
  return Math.round(value * 10) / 10;
};

const classifyServingSizeRisk = (
  servingSizeGrams: number,
  packSizeGrams: number,
  servingsPerPack: number
): RiskLevel => {
  if (servingSizeGrams <= 0 || packSizeGrams <= 0) {
    return "Moderate";
  }

  if (servingsPerPack >= 8 && servingSizeGrams <= 25) {
    return "High";
  }

  if (servingsPerPack >= 5) {
    return "Moderate";
  }

  if (servingSizeGrams / packSizeGrams <= 0.15) {
    return "Moderate";
  }

  return "Low";
};

const createServingSizeReason = (
  servingSizeGrams: number,
  packSizeGrams: number,
  servingsPerPack: number,
  risk: RiskLevel
): string => {
  if (servingSizeGrams <= 0 || packSizeGrams <= 0) {
    return "Serving size or pack size is missing or invalid, so the serving-size reality cannot be fully evaluated.";
  }

  if (risk === "High") {
    return `The label shows about ${servingsPerPack} servings per pack. The serving size is small compared with the full pack, so per-serving nutrition values may appear lower than realistic consumption.`;
  }

  if (risk === "Moderate") {
    return `The pack contains about ${servingsPerPack} servings. Nutrition values should be read with serving size in mind.`;
  }

  return `The serving size appears reasonably aligned with the pack size. The per-serving nutrition values are less likely to be minimized by serving-size framing.`;
};

export const analyzeServingSizeReality = (
  input: FoodLabelInput
): ServingSizeRealityResult => {
  const servingsPerPack =
    input.servingSizeGrams > 0
      ? roundToOneDecimal(input.packSizeGrams / input.servingSizeGrams)
      : 0;

  const risk = classifyServingSizeRisk(
    input.servingSizeGrams,
    input.packSizeGrams,
    servingsPerPack
  );

  return {
    servingsPerPack,
    risk,
    reason: createServingSizeReason(
      input.servingSizeGrams,
      input.packSizeGrams,
      servingsPerPack,
      risk
    ),
  };
};