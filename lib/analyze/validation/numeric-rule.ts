import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

import type { ValidationIssue } from "./validation-result";

export function validateNumericFields(
  draft: UploadExtractionDraft
): ValidationIssue[] {

  const issues: ValidationIssue[] = [];

  const numericFields = [

    "calories",

    "sugarGrams",

    "sodiumMg",

    "totalFatGrams",

    "saturatedFatGrams",

    "proteinGrams",

    "fiberGrams",

  ] as const;

  for (const field of numericFields) {

    const value =
      Number(draft[field].value);

    if (
      Number.isNaN(value)
    ) {
      continue;
    }

    if (value < 0) {

      issues.push({

        field,

        severity: "critical",

        message:
          "Negative value detected.",

      });

    }

  }

  return issues;

}