import { describe, expect, it } from "vitest";
import {
  createExtractionDraftField,
  mapExtractionDraftToManualState,
  type UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";

const draft: UploadExtractionDraft = {
  productName: createExtractionDraftField({
    value: "Sample",
    confidence: "High",
    source: "sample",
  }),
  brandName: createExtractionDraftField({ value: "" }),
  category: createExtractionDraftField({ value: "Snack" }),
  servingSizeGrams: createExtractionDraftField({ value: "25" }),
  packSizeGrams: createExtractionDraftField({ value: "400" }),
  calories: createExtractionDraftField({ value: "126.91" }),
  sugarGrams: createExtractionDraftField({ value: "9.68" }),
  sodiumMg: createExtractionDraftField({ value: "2.22" }),
  totalFatGrams: createExtractionDraftField({ value: "6.10" }),
  saturatedFatGrams: createExtractionDraftField({ value: "2.70" }),
  proteinGrams: createExtractionDraftField({ value: "1.69" }),
  fiberGrams: createExtractionDraftField({ value: "0.72" }),
  ingredients: createExtractionDraftField({ value: "not clearly visible" }),
  claims: createExtractionDraftField({ value: "none visible" }),
};

describe("extraction draft", () => {
  it("creates extraction draft fields with defaults", () => {
    expect(createExtractionDraftField({ value: "Test" })).toEqual({
      value: "Test",
      confidence: "Unknown",
      source: "user",
    });
  });

  it("maps extraction drafts to manual analyzer state", () => {
    const state = mapExtractionDraftToManualState(draft);

    expect(state.productName).toBe("Sample");
    expect(state.servingSizeGrams).toBe("25");
    expect(state.calories).toBe("126.91");
  });
});