import { detectSections } from "@/lib/analyze/section-detector";

import { parseClaims } from "./parsers/claims-parser";
import { parseIngredients } from "./parsers/ingredient-parser";
import { parseNutrition } from "./parsers/nutrition-parser";
import { parseProduct } from "./parsers/product-parser";
import { parseServing } from "./parsers/serving-parser";

export async function parseLabel(
  text: string
) {

  console.log("======================================");
  console.log("INSIDE parser-orchestrator");
  console.log("======================================");

  const sections = detectSections(text);

  console.log("========== OCR SECTIONS ==========");
  console.log(sections);

  const identityText =
    sections.identity.join("\n");

  const nutritionText =
    sections.nutrition.join("\n");

  const ingredientText =
    sections.ingredients.join("\n");

  const claimsText =
    sections.claims.join("\n");

  console.log("========== IDENTITY ==========");
  console.log(identityText);

  console.log("========== NUTRITION ==========");
  console.log(nutritionText);

  console.log("========== INGREDIENTS ==========");
  console.log(ingredientText);

  console.log("========== CLAIMS ==========");
  console.log(claimsText);

  const nutrition =
    await parseNutrition(nutritionText);

  const product =
    parseProduct(identityText);

  const serving =
    parseServing(nutritionText);

  const ingredients =
    parseIngredients(ingredientText);

  const claims =
    parseClaims(claimsText);

  const result = {
    product,
    serving,
    nutrition,
    ingredients,
    claims,
  };

  console.log("========== FINAL PARSER OUTPUT ==========");
  console.log(result);

  return result;
}

export async function runParserPipeline(
  text: string
) {
  return parseLabel(text);
}