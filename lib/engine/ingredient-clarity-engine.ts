import type {
  FoodLabelInput,
  IngredientClarityResult,
  RiskLevel,
} from "./types";

const SUGAR_ALIASES = [
  "sugar",
  "glucose",
  "glucose syrup",
  "fructose",
  "corn syrup",
  "high fructose corn syrup",
  "maltodextrin",
  "dextrose",
  "sucrose",
  "invert sugar",
  "molasses",
  "honey",
  "jaggery",
  "brown sugar",
  "cane sugar",
  "liquid glucose",
];

const ADDITIVE_INDICATORS = [
  "emulsifier",
  "stabilizer",
  "preservative",
  "artificial flavour",
  "artificial flavor",
  "nature identical flavour",
  "nature identical flavor",
  "colour",
  "color",
  "raising agent",
  "acidity regulator",
  "anticaking agent",
  "thickener",
  "permitted synthetic food colour",
  "permitted synthetic food color",
  "ins",
];

const splitIngredients = (ingredients: string): string[] => {
  return ingredients
    .split(",")
    .map((ingredient) => ingredient.trim().toLowerCase())
    .filter(Boolean);
};

const findMatches = (ingredients: string[], dictionary: string[]): string[] => {
  const ingredientText = ingredients.join(" ");

  return dictionary.filter((item) => ingredientText.includes(item));
};

const classifyIngredientComplexity = (
  ingredientCount: number,
  sugarAliasCount: number,
  additiveCount: number
): RiskLevel => {
  if (ingredientCount >= 15 || additiveCount >= 5 || sugarAliasCount >= 4) {
    return "High";
  }

  if (ingredientCount >= 8 || additiveCount >= 2 || sugarAliasCount >= 2) {
    return "Moderate";
  }

  return "Low";
};

export const analyzeIngredientClarity = (
  input: FoodLabelInput
): IngredientClarityResult => {
  const ingredients = splitIngredients(input.ingredients);

  const sugarAliasesDetected = findMatches(ingredients, SUGAR_ALIASES);
  const additiveIndicatorsDetected = findMatches(ingredients, ADDITIVE_INDICATORS);

  return {
    primaryIngredient: ingredients[0] ?? null,
    ingredientCount: ingredients.length,
    sugarAliasesDetected,
    additiveIndicatorsDetected,
    ingredientComplexity: classifyIngredientComplexity(
      ingredients.length,
      sugarAliasesDetected.length,
      additiveIndicatorsDetected.length
    ),
  };
};