import { analyzeLayout } from "@/lib/analyze/layout/layout-analyzer";

import { extractIdentity } from "@/lib/analyze/extractors/identity";
import { extractIngredients } from "@/lib/analyze/extractors/ingredients";

import {
  createExtractionDraftField,
  type UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";

import type {
  ExtractionPipelineInput,
  ExtractionPipelineResult,
} from "./types";

function emptyDraft(): UploadExtractionDraft {
  return {
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
}

export async function runExtractionPipeline(
  input: ExtractionPipelineInput
): Promise<ExtractionPipelineResult> {

  //
  // Layout
  //

  const layout =
    await analyzeLayout(input.rawOcrText);

  //
  // Identity
  //

  const identity =
    extractIdentity(layout);

  //
  // Ingredients
  //

  const ingredients =
    extractIngredients(layout);

  //
  // Draft
  //

  const draft =
    emptyDraft();

  draft.brandName =
    createExtractionDraftField({
      value:
        identity.data.brand.value,
      confidence:
        identity.data.brand.confidence,
      source: "ocr",
    });

  draft.productName =
    createExtractionDraftField({
      value:
        identity.data.productName.value,
      confidence:
        identity.data.productName.confidence,
      source: "ocr",
    });

  draft.category =
    createExtractionDraftField({
      value:
        identity.data.category.value,
      confidence:
        identity.data.category.confidence,
      source: "ocr",
    });

  draft.ingredients =
    createExtractionDraftField({
      value:
        ingredients.data.ingredients.value,
      confidence:
        ingredients.data.ingredients.confidence,
      source: "ocr",
    });

  return {

    layout,

    identity,

    draft,

    warnings: [

      ...identity.warnings,

      ...ingredients.warnings,

    ],

  };

}