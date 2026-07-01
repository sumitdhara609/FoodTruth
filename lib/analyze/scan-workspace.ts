export const scanWorkspacePolicy = {
  storesCameraImage: false,
  storesFileName: false,
  storesFileSize: false,
  requiresUserReviewBeforeReport: true,
  directScanToReport: false,
  savesOnlyReviewedLabelData: true,
} as const;

export const scanWorkspaceSteps = [
  {
    title: "Capture label",
    description:
      "Use a camera-led flow to capture a packaged-food label as a temporary input.",
  },
  {
    title: "Create extraction draft",
    description:
      "Prepare visible label values as a draft before report generation.",
  },
  {
    title: "Review values",
    description:
      "Confirm serving size, nutrition values, ingredients, and claims before analysis.",
  },
  {
    title: "Generate report",
    description:
      "FoodTruth generates reports only from reviewed label data.",
  },
] as const;

export const scanWorkspaceCopy = {
  eyebrow: "Scan Workspace",
  title: "Camera scan foundation.",
  description:
    "Scan will use the same review-first extraction pipeline as uploads. The camera image remains temporary and is not stored.",
  unavailable:
    "Live camera capture is not active yet. Use upload review while the scan workflow is being prepared.",
} as const;