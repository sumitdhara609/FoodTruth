import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";
import type { SavedReportSource } from "@/lib/database/database-policy";

export type ReviewSaveActionResult =
  | {
      success: true;
      message: string;
      reportId: string;
    }
  | {
      success: false;
      message: string;
    };

export type ReviewSaveAction = (
  reviewedLabelData: ManualAnalyzerState
) => Promise<ReviewSaveActionResult>;

export type ReviewSaveContract = {
  source: SavedReportSource;
  label: string;
  actionName: string;
  requiresSignedInUser: true;
  storesReviewedLabelDataOnly: true;
};

export const reviewSaveContracts: Record<SavedReportSource, ReviewSaveContract> =
  {
    manual: {
      source: "manual",
      label: "Manual review save",
      actionName: "saveManualReportAction",
      requiresSignedInUser: true,
      storesReviewedLabelDataOnly: true,
    },
    upload: {
      source: "upload",
      label: "Upload review save",
      actionName: "saveUploadReviewReportAction",
      requiresSignedInUser: true,
      storesReviewedLabelDataOnly: true,
    },
    scan: {
      source: "scan",
      label: "Scan review save",
      actionName: "saveScanReviewReportAction",
      requiresSignedInUser: true,
      storesReviewedLabelDataOnly: true,
    },
  };

export const getReviewSaveContract = (source: SavedReportSource) => {
  return reviewSaveContracts[source];
};