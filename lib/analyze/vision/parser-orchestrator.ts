import { cleanOcrText } from "./ocr-cleaner";
import { detectLayout } from "./layout-detector";

import { parseProductSection } from "./parsers/product-parser";
import { parseServing } from "./parsers/serving-parser";
import { parseNutrition } from "./parsers/nutrition-parser";
import { parseIngredientSection } from "./parsers/ingredient-parser";
import { parseClaims } from "./parsers/claims-parser";

export type ParserPipelineResult = {
  product: Awaited<ReturnType<typeof parseProductSection>>;
  serving: Awaited<ReturnType<typeof parseServing>>;
  nutrition: Awaited<ReturnType<typeof parseNutrition>>;
  ingredients: Awaited<ReturnType<typeof parseIngredientSection>>;
  claims: Awaited<ReturnType<typeof parseClaims>>;
  corrections: string[];
};

export async function runParserPipeline(
  rawText: string
): Promise<ParserPipelineResult> {
  // Clean OCR text
  const cleaned = cleanOcrText(rawText);
  const text = cleaned.cleanedText;

  // Detect sections of the food label
  const layout = detectLayout(text);

  // Run all parsers in parallel on their own section
  const [
    product,
    serving,
    nutrition,
    ingredients,
    claims,
  ] = await Promise.all([
    Promise.resolve(parseProductSection(layout.product)),
    Promise.resolve(parseServing(layout.serving)),
    parseNutrition(layout.nutrition),
    Promise.resolve(parseIngredientSection(layout.ingredients)),
    Promise.resolve(parseClaims(layout.claims)),
  ]);

  return {
    product,
    serving,
    nutrition,
    ingredients,
    claims,
    corrections: cleaned.corrections,
  };
}