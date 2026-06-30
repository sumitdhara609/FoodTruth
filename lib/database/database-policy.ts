export const savedReportDatabasePolicy = {
  storesOriginalImage: false,
  storesFileName: false,
  storesFileSize: false,
  storesReviewedLabelData: true,
  storesReportSignals: true,
  requiresUserOwnership: true,
  usesRowLevelSecurity: true,
};

export const savedReportSources = ["manual", "upload", "scan"] as const;

export type SavedReportSource = (typeof savedReportSources)[number];

export const isSavedReportSource = (source: string): source is SavedReportSource => {
  return savedReportSources.includes(source as SavedReportSource);
};