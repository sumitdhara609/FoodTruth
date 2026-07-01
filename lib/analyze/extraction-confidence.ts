import type {
  ExtractionDraftConfidence,
  UploadExtractionDraft,
} from "@/lib/analyze/extraction-draft";

export type ExtractionConfidenceSummary = {
  High: number;
  Medium: number;
  Low: number;
  Unknown: number;
};

export const getExtractionDraftFields = (draft: UploadExtractionDraft) => {
  return Object.values(draft);
};

export const summarizeExtractionConfidence = (
  draft: UploadExtractionDraft
): ExtractionConfidenceSummary => {
  const summary: ExtractionConfidenceSummary = {
    High: 0,
    Medium: 0,
    Low: 0,
    Unknown: 0,
  };

  for (const field of getExtractionDraftFields(draft)) {
    summary[field.confidence] += 1;
  }

  return summary;
};

export const getLowestExtractionConfidence = (
  draft: UploadExtractionDraft
): ExtractionDraftConfidence => {
  const summary = summarizeExtractionConfidence(draft);
  const lowestFirst: ExtractionDraftConfidence[] = [
    "Unknown",
    "Low",
    "Medium",
    "High",
  ];

  return (
    lowestFirst.find((confidence) => summary[confidence] > 0) ?? "Unknown"
  );
};