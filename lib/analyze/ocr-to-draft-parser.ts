import type { UploadExtractionDraft } from "@/lib/analyze/extraction-draft";
import { runFoodLabelAiEngine } from "@/lib/analyze/ai/foodtruth-ai-engine";
import { mapAiResultToDraft } from "@/lib/analyze/ai/foodtruth-ai-to-draft";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";

export async function parseOcrTextToExtractionDraft(
  result: OcrTextResult
): Promise<UploadExtractionDraft> {
  const rawText = result.blocks
    .map((block) => block.text)
    .join("\n");

  const aiResult = await runFoodLabelAiEngine(rawText);

  return mapAiResultToDraft(aiResult);
}