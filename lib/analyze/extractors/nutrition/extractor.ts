import type { LayoutDocument } from "@/lib/analyze/layout/types";

import {
  createEvidence,
  type ExtractedField,
} from "../shared";

import type {
  NutritionData,
  NutritionExtractorResult,
  NutritionField,
} from "./types";

import { parseNutritionTable } from "./table-parser";

function emptyField(): NutritionField {
  return {
    value: "",
    unit: "",
    confidence: "Unknown",
    extractor: "nutrition",
    evidence: [],
  };
}

export function extractNutrition(
  document: LayoutDocument
): NutritionExtractorResult {

  const section =
    document.sections.find(
      s => s.type === "nutrition"
    );

  const nutrition: NutritionData = {

    energy: emptyField(),

    protein: emptyField(),

    totalFat: emptyField(),

    saturatedFat: emptyField(),

    transFat: emptyField(),

    carbohydrates: emptyField(),

    sugar: emptyField(),

    addedSugar: emptyField(),

    fiber: emptyField(),

    sodium: emptyField(),

  };

  if (!section) {

    return {

      success: false,

      warnings: [
        "Nutrition section not found."
      ],

      data: nutrition,

    };

  }

  const table =
    parseNutritionTable(
      section.lines.map(
        line => line.text
      )
    );

  const lineLookup =
    new Map(
      section.lines.map(
        line => [
          line.text,
          line,
        ]
      )
    );

  for (const key of Object.keys(table)) {

    const parsed =
      table[key];

    const line =
      lineLookup.get(
        parsed.source
      );

    if (!line) {
      continue;
    }

    const field: NutritionField = {

      value:
        parsed.value,

      unit:
        parsed.unit,

      confidence:
        "High",

      extractor:
        "nutrition",

      evidence: [

        createEvidence(
          line.text,
          line.lineNumber
        ),

      ],

    };

    switch (key) {

      case "energy":
        nutrition.energy =
          field;
        break;

      case "protein":
        nutrition.protein =
          field;
        break;

      case "totalFat":
        nutrition.totalFat =
          field;
        break;

      case "saturatedFat":
        nutrition.saturatedFat =
          field;
        break;

      case "transFat":
        nutrition.transFat =
          field;
        break;

      case "carbohydrates":
        nutrition.carbohydrates =
          field;
        break;

      case "sugar":
        nutrition.sugar =
          field;
        break;

      case "addedSugar":
        nutrition.addedSugar =
          field;
        break;

      case "fiber":
        nutrition.fiber =
          field;
        break;

      case "sodium":
        nutrition.sodium =
          field;
        break;

    }

  }

  return {

    success: true,

    warnings: [],

    data: nutrition,

  };

}