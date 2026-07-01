import {
  createExtractionDraftField,
  mapExtractionDraftToManualState,
  type UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";

export const realLabelUploadExtractionDraft: UploadExtractionDraft = {
  productName: createExtractionDraftField({
    value: "Real packaged snack label test",
    confidence: "Medium",
    source: "sample",
  }),
  brandName: createExtractionDraftField({
    value: "",
    confidence: "Unknown",
    source: "sample",
  }),
  category: createExtractionDraftField({
    value: "Packaged snack",
    confidence: "Medium",
    source: "sample",
  }),
  servingSizeGrams: createExtractionDraftField({
    value: "25",
    confidence: "High",
    source: "sample",
  }),
  packSizeGrams: createExtractionDraftField({
    value: "400",
    confidence: "Medium",
    source: "sample",
  }),
  calories: createExtractionDraftField({
    value: "126.91",
    confidence: "High",
    source: "sample",
  }),
  sugarGrams: createExtractionDraftField({
    value: "9.68",
    confidence: "High",
    source: "sample",
  }),
  sodiumMg: createExtractionDraftField({
    value: "2.22",
    confidence: "High",
    source: "sample",
  }),
  totalFatGrams: createExtractionDraftField({
    value: "6.10",
    confidence: "High",
    source: "sample",
  }),
  saturatedFatGrams: createExtractionDraftField({
    value: "2.70",
    confidence: "High",
    source: "sample",
  }),
  proteinGrams: createExtractionDraftField({
    value: "1.69",
    confidence: "High",
    source: "sample",
  }),
  fiberGrams: createExtractionDraftField({
    value: "0.72",
    confidence: "High",
    source: "sample",
  }),
  ingredients: createExtractionDraftField({
    value: "not clearly visible",
    confidence: "Low",
    source: "sample",
  }),
  claims: createExtractionDraftField({
    value: "none visible",
    confidence: "Medium",
    source: "sample",
  }),
};

export const realLabelUploadReviewSample = mapExtractionDraftToManualState(
  realLabelUploadExtractionDraft
);