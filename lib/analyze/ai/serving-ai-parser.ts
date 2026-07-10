import { findNumberAfterAnyLabel } from "@/lib/analyze/ocr-numeric-parser";
import type { ServingExtraction } from "./types";

export async function extractServingInformation(
  text: string
): Promise<ServingExtraction> {
  return {
    servingSizeGrams: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["serving size", "serving"],
        })?.value ?? "",
      confidence: "High",
    },

    packSizeGrams: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["net weight", "pack size"],
        })?.value ?? "",
      confidence: "Medium",
    },
  };
}