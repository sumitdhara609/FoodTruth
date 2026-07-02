import type {
  OcrTextBlock,
  OcrTextBlockKind,
  OcrTextResult,
} from "@/lib/analyze/ocr-text-result";

export type OcrTextSummary = {
  totalBlocks: number;
  nutritionBlocks: number;
  ingredientBlocks: number;
  claimBlocks: number;
  servingBlocks: number;
  unknownBlocks: number;
};

export const getOcrTextBlocksByKind = (
  result: OcrTextResult,
  kind: OcrTextBlockKind
): OcrTextBlock[] => {
  return result.blocks.filter((block) => block.kind === kind);
};

export const summarizeOcrTextResult = (
  result: OcrTextResult
): OcrTextSummary => {
  return {
    totalBlocks: result.blocks.length,
    nutritionBlocks: getOcrTextBlocksByKind(result, "nutrition").length,
    ingredientBlocks: getOcrTextBlocksByKind(result, "ingredients").length,
    claimBlocks: getOcrTextBlocksByKind(result, "claims").length,
    servingBlocks: getOcrTextBlocksByKind(result, "serving").length,
    unknownBlocks: getOcrTextBlocksByKind(result, "unknown").length,
  };
};