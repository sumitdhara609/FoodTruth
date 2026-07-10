import { findNumberAfterAnyLabel } from "@/lib/analyze/ocr-numeric-parser";

export function parseServing(text: string) {
  return {
    servingSize:
      findNumberAfterAnyLabel({
        text,
        labels: [
          "serving size",
          "serving",
        ],
      })?.value ?? "",

    servingsPerPack:
      findNumberAfterAnyLabel({
        text,
        labels: [
          "servings per pack",
        ],
      })?.value ?? "",
  };
}