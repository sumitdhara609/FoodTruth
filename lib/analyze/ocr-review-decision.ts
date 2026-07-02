import type {
  OcrDraftQualityLevel,
  OcrDraftQualityResult,
} from "@/lib/analyze/ocr-draft-quality";

export type OcrReviewDecisionAction =
  | "review-and-generate"
  | "fix-required-fields"
  | "verify-low-confidence";

export type OcrReviewDecision = {
  level: OcrDraftQualityLevel;
  action: OcrReviewDecisionAction;
  title: string;
  message: string;
  canGenerateReport: boolean;
};

export const getOcrReviewDecision = (
  quality: OcrDraftQualityResult
): OcrReviewDecision => {
  if (quality.level === "Incomplete") {
    return {
      level: quality.level,
      action: "fix-required-fields",
      title: "Required values need review.",
      message:
        "Some required values were not extracted. Fill the missing fields from the label before generating a FoodTruth report.",
      canGenerateReport: false,
    };
  }

  if (quality.level === "Needs Review") {
    return {
      level: quality.level,
      action: "verify-low-confidence",
      title: "Verify low-confidence values.",
      message:
        "The draft has enough required values, but some fields were extracted with low confidence. Check them against the uploaded label before generating the report.",
      canGenerateReport: true,
    };
  }

  return {
    level: quality.level,
    action: "review-and-generate",
    title: "Draft is ready for review.",
    message:
      "The required values were extracted. Review the filled fields once, then generate the FoodTruth report.",
    canGenerateReport: true,
  };
};