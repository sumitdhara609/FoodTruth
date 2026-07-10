import { extractNutrition } from "@/lib/analyze/ai/nutrition-ai-parser";

export async function parseNutrition(
  text: string
) {
  return extractNutrition(text);
}