import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

export type OcrDraftQualityLevel = "Ready" | "Needs Review" | "Incomplete";

export type OcrDraftQualityIssue = {
  field: keyof UploadExtractionDraft;
  label: string;
  message: string;
  severity: "info" | "warning" | "critical";
};

export type OcrDraftQualityResult = {
  level: OcrDraftQualityLevel;
  extractedFieldCount: number;
  missingRequiredFieldCount: number;
  lowConfidenceFieldCount: number;
  issues: OcrDraftQualityIssue[];
};

const requiredFields: {
  field: keyof UploadExtractionDraft;
  label: string;
}[] = [
  { field: "productName", label: "Product name" },
  { field: "category", label: "Category" },
  { field: "servingSizeGrams", label: "Serving size" },
  { field: "packSizeGrams", label: "Pack size" },
  { field: "calories", label: "Calories" },
  { field: "sugarGrams", label: "Sugar" },
  { field: "sodiumMg", label: "Sodium" },
  { field: "totalFatGrams", label: "Total fat" },
];

const importantOptionalFields: {
  field: keyof UploadExtractionDraft;
  label: string;
}[] = [
  { field: "saturatedFatGrams", label: "Saturated fat" },
  { field: "proteinGrams", label: "Protein" },
  { field: "fiberGrams", label: "Fiber" },
  { field: "ingredients", label: "Ingredients" },
  { field: "claims", label: "Claims" },
];

const hasValue = (value: unknown) => {
  return typeof value === "string" && value.trim().length > 0;
};

export const evaluateOcrDraftQuality = (
  draft: UploadExtractionDraft
): OcrDraftQualityResult => {
  const issues: OcrDraftQualityIssue[] = [];

  const allFields = [...requiredFields, ...importantOptionalFields];

  const extractedFieldCount = allFields.filter(({ field }) =>
    hasValue(draft[field].value)
  ).length;

  for (const fieldConfig of requiredFields) {
    const field = draft[fieldConfig.field];

    if (!hasValue(field.value)) {
      issues.push({
        field: fieldConfig.field,
        label: fieldConfig.label,
        severity: "critical",
        message: `${fieldConfig.label} was not extracted. Review the label and enter it manually before generating a reliable report.`,
      });
    }
  }

  for (const fieldConfig of allFields) {
    const field = draft[fieldConfig.field];

    if (hasValue(field.value) && field.confidence === "Low") {
      issues.push({
        field: fieldConfig.field,
        label: fieldConfig.label,
        severity: "warning",
        message: `${fieldConfig.label} was extracted with low confidence. Please verify it against the label image.`,
      });
    }

    if (hasValue(field.value) && field.confidence === "Unknown") {
      issues.push({
        field: fieldConfig.field,
        label: fieldConfig.label,
        severity: "info",
        message: `${fieldConfig.label} was extracted, but confidence is unknown. Review before saving.`,
      });
    }
  }

  const missingRequiredFieldCount = issues.filter(
    (issue) => issue.severity === "critical"
  ).length;

  const lowConfidenceFieldCount = issues.filter(
    (issue) => issue.severity === "warning"
  ).length;

  const level: OcrDraftQualityLevel =
    missingRequiredFieldCount > 0
      ? "Incomplete"
      : lowConfidenceFieldCount > 0
        ? "Needs Review"
        : "Ready";

  return {
    level,
    extractedFieldCount,
    missingRequiredFieldCount,
    lowConfidenceFieldCount,
    issues,
  };
};