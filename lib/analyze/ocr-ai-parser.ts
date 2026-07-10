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

  const lines = result.blocks.map(x => x.text);

  for (const line of lines) {

    const lower = line.toLowerCase();

    if (lower.includes("energy") || lower.includes("calories")) {
      draft.calories = createExtractionDraftField({
        value: getNumber(line),
        confidence: "High",
        source: "ocr"
      });
    }

    if (lower.includes("sugar")) {
      draft.sugarGrams = createExtractionDraftField({
        value: getNumber(line),
        confidence: "High",
        source: "ocr"
      });
    }

    if (lower.includes("protein")) {
      draft.proteinGrams = createExtractionDraftField({
        value: getNumber(line),
        confidence: "High",
        source: "ocr"
      });
    }

    if (lower.includes("fiber")) {
      draft.fiberGrams = createExtractionDraftField({
        value: getNumber(line),
        confidence: "High",
        source: "ocr"
      });
    }

    if (lower.includes("sodium")) {
      draft.sodiumMg = createExtractionDraftField({
        value: getNumber(line),
        confidence: "High",
        source: "ocr"
      });
    }

    if (lower.includes("fat")) {

      if (lower.includes("saturated")) {

        draft.saturatedFatGrams = createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr"
        });

      } else {

        draft.totalFatGrams = createExtractionDraftField({
          value: getNumber(line),
          confidence: "High",
          source: "ocr"
        });

      }

    }

    if (lower.startsWith("ingredients")) {

      draft.ingredients = createExtractionDraftField({
        value: line.replace(/ingredients:?/i, "").trim(),
        confidence: "Medium",
        source: "ocr"
      });

    }

    if (
      lower.includes("high protein") ||
      lower.includes("low fat") ||
      lower.includes("no added sugar") ||
      lower.includes("natural")
    ) {

      draft.claims = createExtractionDraftField({
        value: line,
        confidence: "Medium",
        source: "ocr"
      });

    }

  }

  return draft;

}