import { findNumberAfterAnyLabel } from "@/lib/analyze/ocr-numeric-parser";
import type { NutritionExtraction } from "./types";

export async function extractNutrition(
  text: string
): Promise<NutritionExtraction> {
  return {
    calories: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["energy", "kcal", "calories"],
        })?.value ?? "",
      confidence: "High",
    },

    sugarGrams: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["sugar", "sugars"],
        })?.value ?? "",
      confidence: "High",
    },

    sodiumMg: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["sodium"],
        })?.value ?? "",
      confidence: "High",
    },

    totalFatGrams: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["fat", "total fat"],
        })?.value ?? "",
      confidence: "High",
    },

    saturatedFatGrams: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["saturated fat", "saturates"],
        })?.value ?? "",
      confidence: "High",
    },

    proteinGrams: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["protein"],
        })?.value ?? "",
      confidence: "High",
    },

    fiberGrams: {
      value:
        findNumberAfterAnyLabel({
          text,
          labels: ["fiber", "fibre"],
        })?.value ?? "",
      confidence: "High",
    },
  };
}