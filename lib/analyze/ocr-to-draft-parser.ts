import {
  createExtractionDraftField,
  type ExtractionDraftConfidence,
  type UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";
import type {
  OcrTextBlock,
  OcrTextBlockKind,
  OcrTextResult,
} from "@/lib/analyze/ocr-text-result";
import { findNumberAfterAnyLabel } from "@/lib/analyze/ocr-numeric-parser";

const getBlocksByKind = (
  result: OcrTextResult,
  kind: OcrTextBlockKind
): OcrTextBlock[] => {
  return result.blocks.filter((block) => block.kind === kind);
};

const joinBlockText = (blocks: OcrTextBlock[]) => {
  return blocks.map((block) => block.text).join(" ").toLowerCase();
};

const findValue = (text: string, labels: string[]) => {
  return findNumberAfterAnyLabel({ text, labels })?.value ?? "";
};

const derivePackSize = ({
  servingSize,
  servingsPerPack,
}: {
  servingSize: string;
  servingsPerPack: string;
}) => {
  if (!servingSize || !servingsPerPack) {
    return "";
  }

  const servingSizeNumber = Number(servingSize);
  const servingsPerPackNumber = Number(servingsPerPack);

  if (!Number.isFinite(servingSizeNumber) || !Number.isFinite(servingsPerPackNumber)) {
    return "";
  }

  return String(servingSizeNumber * servingsPerPackNumber);
};

const getLowestConfidence = (
  blocks: OcrTextBlock[],
  fallback: ExtractionDraftConfidence = "Unknown"
): ExtractionDraftConfidence => {
  if (blocks.some((block) => block.confidence === "Low")) {
    return "Low";
  }

  if (blocks.some((block) => block.confidence === "Medium")) {
    return "Medium";
  }

  if (blocks.some((block) => block.confidence === "High")) {
    return "High";
  }

  return fallback;
};

const pickText = (blocks: OcrTextBlock[]) => {
  return blocks.map((block) => block.text).join("\n").trim();
};

export const parseOcrTextToExtractionDraft = (
  result: OcrTextResult
): UploadExtractionDraft => {
  const servingBlocks = getBlocksByKind(result, "serving");
  const nutritionBlocks = getBlocksByKind(result, "nutrition");
  const ingredientBlocks = getBlocksByKind(result, "ingredients");
  const claimBlocks = getBlocksByKind(result, "claims");

  const servingText = joinBlockText(servingBlocks);
  const nutritionText = joinBlockText(nutritionBlocks);

  const servingSize = findValue(servingText, [
    "serving size",
    "serve size",
    "serving",
  ]);

  const servingsPerPack = findValue(servingText, [
    "servings per pack",
    "serves per pack",
    "servings",
  ]);

  const packSize =
    findValue(servingText, ["net weight", "net wt", "pack size"]) ||
    derivePackSize({ servingSize, servingsPerPack });

  return {
    productName: createExtractionDraftField({
      value: "Uploaded label draft",
      confidence: "Unknown",
      source: "ocr",
    }),
    brandName: createExtractionDraftField({
      value: "",
      confidence: "Unknown",
      source: "ocr",
    }),
    category: createExtractionDraftField({
      value: "Packaged food",
      confidence: "Medium",
      source: "ocr",
    }),
    servingSizeGrams: createExtractionDraftField({
      value: servingSize,
      confidence: servingSize ? getLowestConfidence(servingBlocks) : "Unknown",
      source: "ocr",
    }),
    packSizeGrams: createExtractionDraftField({
      value: packSize,
      confidence: packSize ? getLowestConfidence(servingBlocks, "Medium") : "Unknown",
      source: "ocr",
    }),
    calories: createExtractionDraftField({
      value: findValue(nutritionText, ["energy", "calories", "calorie", "kcal"]),
      confidence: getLowestConfidence(nutritionBlocks),
      source: "ocr",
    }),
    sugarGrams: createExtractionDraftField({
      value: findValue(nutritionText, ["sugars", "sugar"]),
      confidence: getLowestConfidence(nutritionBlocks),
      source: "ocr",
    }),
    sodiumMg: createExtractionDraftField({
      value: findValue(nutritionText, ["sodium", "salt"]),
      confidence: getLowestConfidence(nutritionBlocks),
      source: "ocr",
    }),
    totalFatGrams: createExtractionDraftField({
      value: findValue(nutritionText, ["total fat", "fat"]),
      confidence: getLowestConfidence(nutritionBlocks),
      source: "ocr",
    }),
    saturatedFatGrams: createExtractionDraftField({
      value: findValue(nutritionText, [
        "saturated fat",
        "saturates",
        "sat fat",
      ]),
      confidence: getLowestConfidence(nutritionBlocks),
      source: "ocr",
    }),
    proteinGrams: createExtractionDraftField({
      value: findValue(nutritionText, ["protein"]),
      confidence: getLowestConfidence(nutritionBlocks),
      source: "ocr",
    }),
    fiberGrams: createExtractionDraftField({
      value: findValue(nutritionText, ["fiber", "fibre"]),
      confidence: getLowestConfidence(nutritionBlocks),
      source: "ocr",
    }),
    ingredients: createExtractionDraftField({
      value: pickText(ingredientBlocks),
      confidence: getLowestConfidence(ingredientBlocks),
      source: "ocr",
    }),
    claims: createExtractionDraftField({
      value: pickText(claimBlocks),
      confidence: getLowestConfidence(claimBlocks),
      source: "ocr",
    }),
  };
};