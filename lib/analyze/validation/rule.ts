import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

import type { ValidationIssue } from "./validation-result";

export interface ValidationRule {

  name: string;

  validate(
    draft: UploadExtractionDraft
  ): ValidationIssue[];

}