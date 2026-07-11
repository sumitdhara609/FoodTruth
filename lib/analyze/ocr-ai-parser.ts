import { detectSections } from "./section-detector";

import type { UploadExtractionDraft } from "./extraction-draft";
import { createExtractionDraftField } from "./extraction-draft";

import type { OcrTextResult } from "./ocr-text-result";

const getNumber = (text: string) => {
  const match = text.match(/[-+]?\d+(\.\d+)?/);
  return match ? match[0] : "";
};

export function parseOcrWithAi(
  result: OcrTextResult
): UploadExtractionDraft {

  const rawText = result.blocks
    .map((b) => b.text)
    .join("\n");

  const sections = detectSections(rawText);

  console.log("===== OCR SECTIONS =====");
  console.log(sections);

  const draft: UploadExtractionDraft = {
    productName: createExtractionDraftField({ value: "" }),
    brandName: createExtractionDraftField({ value: "" }),
    category: createExtractionDraftField({ value: "" }),

    servingSizeGrams: createExtractionDraftField({ value: "" }),
    packSizeGrams: createExtractionDraftField({ value: "" }),

    calories: createExtractionDraftField({ value: "" }),
    sugarGrams: createExtractionDraftField({ value: "" }),
    sodiumMg: createExtractionDraftField({ value: "" }),
    totalFatGrams: createExtractionDraftField({ value: "" }),
    saturatedFatGrams: createExtractionDraftField({ value: "" }),
    proteinGrams: createExtractionDraftField({ value: "" }),
    fiberGrams: createExtractionDraftField({ value: "" }),

    ingredients: createExtractionDraftField({ value: "" }),
    claims: createExtractionDraftField({ value: "" }),
  };

  //
  // ---------------------------
  // IDENTITY
  // ---------------------------
  //

  for (const line of sections.identity) {

    const lower = line.toLowerCase();

    if (
      !draft.productName.value &&
      line.length > 3 &&
      !lower.includes("nutrition") &&
      !lower.includes("ingredient")
    ) {
      draft.productName = createExtractionDraftField({
        value: line,
        confidence: "Medium",
        source: "ocr",
      });

      break;
    }
  }

  //
  // ---------------------------
  // INGREDIENTS
  // ---------------------------
  //

  if (sections.ingredients.length) {

    const ingredients = sections.ingredients
      .join(" ")
      .replace(/ingredients:?/i, "")
      .trim();

    draft.ingredients = createExtractionDraftField({
      value: ingredients,
      confidence: "High",
      source: "ocr",
    });
  }

  //
  // ---------------------------
  // CLAIMS
  // ---------------------------
  //

  const claims: string[] = [];

  for (const line of sections.claims) {

    const lower = line.toLowerCase();

    if (
      lower.includes("high protein") ||
      lower.includes("low fat") ||
      lower.includes("natural") ||
      lower.includes("no added sugar")
    ) {
      claims.push(line);
    }
  }

  if (claims.length) {

    draft.claims = createExtractionDraftField({
      value: claims.join(", "),
      confidence: "Medium",
      source: "ocr",
    });

  }

  //
  // ---------------------------
  // NUTRITION
  // ---------------------------
  //

  for (const line of sections.nutrition) {

    const lower = line.toLowerCase();

    if (
      lower.includes("serving") &&
      lower.includes("g")
    ) {

      draft.servingSizeGrams =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

    if (
      lower.includes("energy") ||
      lower.includes("calories")
    ) {

      draft.calories =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

    if (
      lower.includes("protein")
    ) {

      draft.proteinGrams =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

    if (
      lower.includes("sugar")
    ) {

      draft.sugarGrams =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

    if (
      lower.includes("fiber")
    ) {

      draft.fiberGrams =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

    if (
      lower.includes("sodium")
    ) {

      draft.sodiumMg =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

    if (
      lower.includes("saturated fat")
    ) {

      draft.saturatedFatGrams =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

    else if (
      lower.includes("total fat")
    ) {

      draft.totalFatGrams =
        createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr",
        });

    }

  }

  return draft;

}