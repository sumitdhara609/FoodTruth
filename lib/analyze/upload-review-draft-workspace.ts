export const uploadReviewDraftPolicy = {
  imageStored: false,
  imagePersistedAcrossPages: false,
  extractedAutomatically: false,
  userReviewRequired: true,
  manualReviewAvailable: true,
} as const;

export const uploadReviewDraftSteps = [
  {
    title: "Use the image as reference",
    description:
      "The uploaded label image remains a temporary preview and is not stored by FoodTruth.",
  },
  {
    title: "Review visible values",
    description:
      "Read the serving size, nutrition values, ingredients, and claims from the uploaded label.",
  },
  {
    title: "Enter reviewed data",
    description:
      "Move into the manual review form to enter only the values that are visible and reliable.",
  },
  {
    title: "Generate report",
    description:
      "FoodTruth generates the report from reviewed label data, not from the original image.",
  },
] as const;

export const uploadReviewDraftMessages = {
  noAutomaticExtraction:
    "Automatic extraction is not active yet. Use the uploaded image as a reference and enter reviewed values manually.",
  privacy:
    "FoodTruth does not store the uploaded image, file name, or file size.",
  nextStep:
    "Continue to manual review when you are ready to enter the visible label values.",
} as const;