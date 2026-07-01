export const scanReviewWorkspacePolicy = {
  cameraCaptureActive: false,
  usesExtractionDraft: true,
  storesCameraImage: false,
  requiresUserReview: true,
  directScanToReport: false,
  savesOnlyReviewedLabelData: true,
} as const;

export const scanReviewWorkspaceCopy = {
  eyebrow: "Scan Review",
  title: "Review scan values before analysis.",
  description:
    "Camera scan review will use extracted draft values, but report generation remains review-first.",
  unavailable:
    "Live camera capture is not active yet. Use upload review while scan capture is being prepared.",
  boundary:
    "FoodTruth will not generate reports directly from camera images. Every scan result must become a reviewed label draft first.",
} as const;