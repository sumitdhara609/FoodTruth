export type OcrMetrics = {
  characterCount: number;

  wordCount: number;

  lineCount: number;

  numericCount: number;

  nutritionKeywordCount: number;

  ingredientKeywordCount: number;

  confidence?: number;
};