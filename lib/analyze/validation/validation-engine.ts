import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

import { validateCrossFields } from "./cross-field-rule";
import { validateNumericFields } from "./numeric-rule";
import type { ValidationResult } from "./validation-result";

export function validateDraft(
  draft: UploadExtractionDraft
): ValidationResult {

  const issues = [

    ...validateNumericFields(draft),

    ...validateCrossFields(draft),

  ];

  const criticalIssues =
    issues.filter(
      issue => issue.severity === "critical"
    ).length;

  const score =
    Math.max(
      0,
      100 - criticalIssues * 20
    );

  return {

    passed:
      criticalIssues === 0,

    score,

    issues,

  };

}