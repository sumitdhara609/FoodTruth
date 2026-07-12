import type { LayoutDocument } from "@/lib/analyze/layout/types";
import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";

import type { IdentityExtractorResult } from "@/lib/analyze/extractors/identity/types";

export type ExtractionPipelineInput = {
  rawOcrText: string;
};

export type ExtractionPipelineResult = {
  layout: LayoutDocument;

  identity: IdentityExtractorResult;

  draft: UploadExtractionDraft;

  warnings: string[];
};