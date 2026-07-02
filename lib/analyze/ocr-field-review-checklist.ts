import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

export type OcrFieldReviewStatus =
  | "ready"
  | "missing"
  | "low-confidence"
  | "unknown-confidence";

export type OcrFieldReviewChecklistItem = {
  field: keyof UploadExtractionDraft;
  label: string;
  value: string;
  status: OcrFieldReviewStatus;
  message: string;
};

const reviewFields: {
  field: keyof UploadExtractionDraft;
  label: string;
  required: boolean;
}[] = [
  { field: "productName", label: "Product name", required: true },
  { field: "category", label: "Category", required: true },
  { field: "servingSizeGrams", label: "Serving size", required: true },
  { field: "packSizeGrams", label: "Pack size", required: true },
  { field: "calories", label: "Calories", required: true },
  { field: "sugarGrams", label: "Sugar", required: true },
  { field: "sodiumMg", label: "Sodium", required: true },
  { field: "totalFatGrams", label: "Total fat", required: true },
  { field: "saturatedFatGrams", label: "Saturated fat", required: false },
  { field: "proteinGrams", label: "Protein", required: false },
  { field: "fiberGrams", label: "Fiber", required: false },
  { field: "ingredients", label: "Ingredients", required: false },
  { field: "claims", label: "Claims", required: false },
];

const hasValue = (value: string) => value.trim().length > 0;

export const createOcrFieldReviewChecklist = (
  draft: UploadExtractionDraft
): OcrFieldReviewChecklistItem[] => {
  return reviewFields.map(({ field, label, required }) => {
    const draftField = draft[field];
    const value = draftField.value.trim();

    if (required && !hasValue(value)) {
      return {
        field,
        label,
        value,
        status: "missing",
        message: `${label} is required but was not extracted. Fill it manually from the label.`,
      };
    }

    if (hasValue(value) && draftField.confidence === "Low") {
      return {
        field,
        label,
        value,
        status: "low-confidence",
        message: `${label} was extracted with low confidence. Verify it carefully.`,
      };
    }

    if (hasValue(value) && draftField.confidence === "Unknown") {
      return {
        field,
        label,
        value,
        status: "unknown-confidence",
        message: `${label} was extracted, but confidence is unknown. Review it before saving.`,
      };
    }

    return {
      field,
      label,
      value,
      status: "ready",
      message: hasValue(value)
        ? `${label} is present in the review draft.`
        : `${label} was not extracted. Add it only if visible on the label.`,
    };
  });
};

export const summarizeOcrFieldReviewChecklist = (
  checklist: OcrFieldReviewChecklistItem[]
) => {
  return {
    total: checklist.length,
    ready: checklist.filter((item) => item.status === "ready").length,
    missing: checklist.filter((item) => item.status === "missing").length,
    lowConfidence: checklist.filter(
      (item) => item.status === "low-confidence"
    ).length,
    unknownConfidence: checklist.filter(
      (item) => item.status === "unknown-confidence"
    ).length,
  };
};