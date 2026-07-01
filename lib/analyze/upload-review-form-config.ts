export const uploadReviewFormCopy = {
  eyebrow: "Upload Review",
  title: "Review visible label values.",
  description:
    "Use the uploaded label as a reference and enter only values that are clearly visible. FoodTruth will generate a report from reviewed data, not from the original image.",
  privacy:
    "The uploaded image is not stored. Only reviewed label values and generated report signals may be saved.",
  extraction:
    "Automatic extraction is not active yet. This review form is built so extraction can later prefill these fields.",
} as const;

export const uploadReviewValueModeOptions = [
  {
    label: "Per serving",
    value: "per-serving",
    description: "Use this when the label shows values for one serving.",
  },
  {
    label: "Per 100g",
    value: "per-100g",
    description: "Use this when the label values are listed per 100g.",
  },
] as const;

export type UploadReviewValueMode =
  (typeof uploadReviewValueModeOptions)[number]["value"];