import { normalizeWhitespace } from "./normalize-whitespace";
import { normalizeSymbols } from "./normalize-symbols";
import { fixUnits } from "./fix-units";
import { fixCommonOcrErrors } from "./fix-common-ocr-errors";
import { removeNoise } from "./remove-noise";
import { mergeBrokenLines } from "./merge-broken-lines";

export type OcrCleaningStage = {
  stage: string;
  text: string;
};

export type OcrCleaningResult = {
  original: string;
  cleaned: string;
  stages: OcrCleaningStage[];
};

export function cleanOcr(
  rawText: string
): OcrCleaningResult {

  const stages: OcrCleaningStage[] = [];

  let text = rawText;

  stages.push({
    stage: "Original",
    text,
  });

  text = normalizeWhitespace(text);

  stages.push({
    stage: "Whitespace",
    text,
  });

  text = normalizeSymbols(text);

  stages.push({
    stage: "Symbols",
    text,
  });

  text = fixUnits(text);

  stages.push({
    stage: "Units",
    text,
  });

  text = fixCommonOcrErrors(text);

  stages.push({
    stage: "OCR Corrections",
    text,
  });

  text = removeNoise(text);

  stages.push({
    stage: "Noise Removed",
    text,
  });

  text = mergeBrokenLines(text);

  stages.push({
    stage: "Merged Lines",
    text,
  });

  return {
    original: rawText,
    cleaned: text,
    stages,
  };

}