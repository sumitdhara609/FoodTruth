import { runBrowserOcrExtraction } from "@/lib/analyze/browser-ocr-provider";
import { mapDraftToFoodLabelInput } from "@/lib/analyze/draft-to-food-label-input";
import { parseOcrTextToExtractionDraft } from "@/lib/analyze/ocr-to-draft-parser";
import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";
import type { UploadImageInput } from "@/lib/analyze/upload-image-input";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import type { FoodTruthReport } from "@/lib/engine/types";

export type FoodTruthAutomationSuccess = {
  success: true;
  draft: UploadExtractionDraft;
  report: FoodTruthReport;
};

export type FoodTruthAutomationFailure = {
  success: false;
  message: string;
};

export type FoodTruthAutomationResult =
  | FoodTruthAutomationSuccess
  | FoodTruthAutomationFailure;

export async function runFoodTruthAutomation({
  file,
  uploadInput,
}: {
  file: File;
  uploadInput: UploadImageInput;
}): Promise<FoodTruthAutomationResult> {
  const ocr = await runBrowserOcrExtraction({
    source: "upload",
    image: file,
    uploadInput,
  });

  if (!ocr.success) {
    return {
      success: false,
      message: ocr.message,
    };
  }

  const draft = await parseOcrTextToExtractionDraft(ocr);

  const input = mapDraftToFoodLabelInput(draft);

  const report = generateValidatedFoodTruthReport(input);

  if (!report.success) {
    return {
      success: false,
      message: report.errors
        .map((error) => `${error.field}: ${error.message}`)
        .join("\n"),
    };
  }

  return {
    success: true,
    draft,
    report: report.report,
  };
}