import type {
  OcrTextBlock,
  OcrTextBlockKind,
} from "@/lib/analyze/ocr-text-result";

const claimKeywords = [
  "no added sugar",
  "high fiber",
  "high fibre",
  "natural",
  "source of",
  "fortified",
];

const nutritionKeywords = [
  "energy",
  "calorie",
  "calories",
  "kcal",
  "sugar",
  "sugars",
  "sodium",
  "fat",
  "protein",
  "fiber",
  "fibre",
];

const servingKeywords = [
  "serving",
  "serving size",
  "serve size",
  "servings per pack",
  "net weight",
];

const ingredientKeywords = ["ingredients", "ingredient"];

const hasAnyKeyword = (text: string, keywords: string[]) => {
  const normalizedText = text.toLowerCase();

  return keywords.some((keyword) => normalizedText.includes(keyword));
};

export const classifyOcrTextBlock = (text: string): OcrTextBlockKind => {
  if (hasAnyKeyword(text, ingredientKeywords)) {
    return "ingredients";
  }

  if (hasAnyKeyword(text, servingKeywords)) {
    return "serving";
  }

  if (hasAnyKeyword(text, claimKeywords)) {
    return "claims";
  }

  if (hasAnyKeyword(text, nutritionKeywords)) {
    return "nutrition";
  }

  return "unknown";
};

export const createClassifiedOcrTextBlock = (text: string): OcrTextBlock => {
  return {
    kind: classifyOcrTextBlock(text),
    confidence: "Unknown",
    text: text.trim(),
  };
};