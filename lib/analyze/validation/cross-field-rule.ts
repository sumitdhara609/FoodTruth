import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

import type { ValidationIssue } from "./validation-result";

export function validateCrossFields(
  draft: UploadExtractionDraft
): ValidationIssue[] {

  const issues: ValidationIssue[] = [];

  const fat =
    Number(
      draft.totalFatGrams.value
    );

  const saturated =
    Number(
      draft.saturatedFatGrams.value
    );

  if (

    Number.isFinite(fat) &&
    Number.isFinite(saturated) &&
    saturated > fat

  ) {

    issues.push({

      field:
        "saturatedFatGrams",

      severity:
        "critical",

      message:
        "Saturated fat exceeds total fat.",

    });

  }

  const serving =
    Number(
      draft.servingSizeGrams.value
    );

  const pack =
    Number(
      draft.packSizeGrams.value
    );

  if (

    Number.isFinite(serving) &&
    Number.isFinite(pack) &&
    serving > pack

  ) {

    issues.push({

      field:
        "servingSizeGrams",

      severity:
        "critical",

      message:
        "Serving size exceeds pack size.",

    });

  }

  return issues;

}