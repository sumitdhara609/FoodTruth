export const uploadWorkspacePolicy = {
  storesOriginalImage: false,
  storesFileName: false,
  storesFileSize: false,
  requiresUserReviewBeforeReport: true,
  savesOnlyReviewedLabelData: true,
} as const;

export const uploadWorkspaceSteps = [
  {
    title: "Upload label image",
    description:
      "Choose a packaged-food label image for temporary local preview.",
  },
  {
    title: "Review label values",
    description:
      "Confirm nutrition values, ingredients, and visible claims before generating a report.",
  },
  {
    title: "Generate FoodTruth report",
    description:
      "Turn reviewed label data into a structured score, concern level, and checklist.",
  },
  {
    title: "Save reviewed report",
    description:
      "Signed-in users can save the reviewed report without storing the original image.",
  },
] as const;