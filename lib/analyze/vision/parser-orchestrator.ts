import { cleanOcrText } from "./ocr-cleaner";
import { detectLabelLayout } from "./layout-detector";

import { parseProductSection } from "./parsers/product-parser";
import { parseIngredientSection } from "./parsers/ingredient-parser";
import { parseClaims } from "./parsers/claims-parser";
import { parseServing } from "./parsers/serving-parser";
import { parseNutrition } from "./parsers/nutrition-parser";

export async function runParserPipeline(
  rawText: string
) {
  const cleaned = cleanOcrText(rawText);

  const layout = detectLabelLayout(
    cleaned.cleanedText
  );

  return {
    cleanedText: cleaned.cleanedText,

    corrections: cleaned.corrections,

    product: parseProductSection(
      layout.product
    ),

    ingredients: parseIngredientSection(
      layout.ingredients
    ),

    claims: parseClaims(
      layout.claims
    ),

    serving: parseServing(
      layout.nutrition
    ),

    nutrition: await parseNutrition(
      layout.nutrition
    ),
  };
}