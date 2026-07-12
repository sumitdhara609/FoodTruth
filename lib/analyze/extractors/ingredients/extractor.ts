import type { LayoutDocument } from "@/lib/analyze/layout/types";

import {
  createEvidenceList,
  type ExtractedField,
} from "../shared";

import type {
  IngredientsData,
  IngredientsExtractorResult,
} from "./types";

import {
  cleanIngredientLine,
  isIngredientEnd,
} from "./heuristics";

function emptyField(): ExtractedField<string> {

  return {

    value: "",

    confidence: "Unknown",

    extractor: "ingredients",

    evidence: [],

  };

}

export function extractIngredients(
  document: LayoutDocument
): IngredientsExtractorResult {

  const ingredients =
    emptyField();

  const section =
    document.sections.find(
      s => s.type === "ingredients"
    );

  if (!section) {

    return {

      success: false,

      warnings: [
        "Ingredients section not found."
      ],

      data: {
        ingredients,
      },

    };

  }

  const usableLines =
    section.lines
      .filter(
        line =>
          !isIngredientEnd(line.text)
      )
      .map(line => ({
        ...line,
        text:
          cleanIngredientLine(
            line.text
          ),
      }))
      .filter(
        line =>
          line.text.length > 0
      );

  ingredients.value =
    usableLines
      .map(
        line => line.text
      )
      .join(" ");

  ingredients.confidence =
    usableLines.length > 0
      ? "High"
      : "Unknown";

  ingredients.evidence =
    createEvidenceList(
      usableLines
    );

  const data: IngredientsData = {
    ingredients,
  };

  return {

    success: true,

    warnings: [],

    data,

  };

}