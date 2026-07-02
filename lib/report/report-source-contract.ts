import type { SavedReportSource } from "@/lib/database/database-policy";

export type ReportSourceContract = {
  source: SavedReportSource;
  label: string;
  savePath: string;
  description: string;
  requiresReviewedLabelData: true;
};

export const reportSourceContracts: Record<
  SavedReportSource,
  ReportSourceContract
> = {
  manual: {
    source: "manual",
    label: "Manual",
    savePath: "app/analyze/manual/actions.ts",
    description:
      "Saves reports created from values entered directly by the user.",
    requiresReviewedLabelData: true,
  },
  upload: {
    source: "upload",
    label: "Upload",
    savePath: "app/analyze/upload/review/actions.ts",
    description:
      "Saves reports created from reviewed values prepared from an uploaded label.",
    requiresReviewedLabelData: true,
  },
  scan: {
    source: "scan",
    label: "Scan",
    savePath: "app/analyze/scan/review/actions.ts",
    description:
      "Saves reports created from reviewed values prepared from a camera scan.",
    requiresReviewedLabelData: true,
  },
};

export const getReportSourceContract = (source: SavedReportSource) => {
  return reportSourceContracts[source];
};