import { findNumberAfterAnyLabel } from "@/lib/analyze/ocr-numeric-parser";
import { parseNutritionTable } from "./nutrition-table";
import type { NutritionExtraction } from "./types";

const pick = (
  tableValue: string | undefined,
  text: string,
  labels: string[]
): string => {
  if (tableValue && tableValue.trim().length > 0) {
    return tableValue.trim();
  }

  return (
    findNumberAfterAnyLabel({
      text,
      labels,
    })?.value ?? ""
  );
};

export async function extractNutrition(
  text: string
): Promise<NutritionExtraction> {
  const table = await parseNutritionTable(text);

  return {
    calories: {
      value: pick(table.calories, text, [
        "energy",
        "energy kcal",
        "kcal",
        "calories",
        "calorie",
      ]),
      confidence: table.calories ? "High" : "Medium",
    },

    sugarGrams: {
      value: pick(table.sugarGrams, text, [
        "total sugars",
        "sugars",
        "sugar",
      ]),
      confidence: table.sugarGrams ? "High" : "Medium",
    },

    sodiumMg: {
      value: pick(table.sodiumMg, text, [
        "sodium",
        "salt",
      ]),
      confidence: table.sodiumMg ? "High" : "Medium",
    },

    totalFatGrams: {
      value: pick(table.totalFatGrams, text, [
        "total fat",
        "fat",
      ]),
      confidence: table.totalFatGrams ? "High" : "Medium",
    },

    saturatedFatGrams: {
      value: pick(table.saturatedFatGrams, text, [
        "saturated fat",
        "saturates",
        "sat fat",
      ]),
      confidence: table.saturatedFatGrams ? "High" : "Medium",
    },

    proteinGrams: {
      value: pick(table.proteinGrams, text, [
        "protein",
      ]),
      confidence: table.proteinGrams ? "High" : "Medium",
    },

    fiberGrams: {
      value: pick(table.fiberGrams, text, [
        "dietary fibre",
        "dietary fiber",
        "fiber",
        "fibre",
      ]),
      confidence: table.fiberGrams ? "High" : "Medium",
    },
  };
}