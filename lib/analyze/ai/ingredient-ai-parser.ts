import type { IngredientExtraction } from "./types";

export async function extractIngredients(
  text: string
): Promise<IngredientExtraction> {
  return {
    ingredients: {
      value: text,
      confidence: "Medium",
    },
  };
}