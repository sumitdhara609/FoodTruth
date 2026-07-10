import { extractClaims } from "./claims-ai-parser";
import { extractIngredients } from "./ingredient-ai-parser";
import { extractNutrition } from "./nutrition-ai-parser";
import { extractProductInformation } from "./product-ai-parser";
import { extractServingInformation } from "./serving-ai-parser";
import type { FoodLabelAiResult } from "./types";

export async function runFoodLabelAiEngine(
  rawText: string
): Promise<FoodLabelAiResult> {
  const [
    product,
    nutrition,
    serving,
    ingredients,
    claims,
  ] = await Promise.all([
    extractProductInformation(rawText),
    extractNutrition(rawText),
    extractServingInformation(rawText),
    extractIngredients(rawText),
    extractClaims(rawText),
  ]);

  return {
    product,
    nutrition,
    serving,
    ingredients,
    claims,
  };
}