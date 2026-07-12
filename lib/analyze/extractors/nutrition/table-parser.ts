import { parseNutritionRow } from "./row-parser";
import { mapNutrient } from "./nutrient-map";

export type ParsedNutritionTable = Record<
  string,
  {
    value: string;
    unit: string;
    source: string;
  }
>;

export function parseNutritionTable(
  lines: string[]
): ParsedNutritionTable {

  const table: ParsedNutritionTable = {};

  for (const line of lines) {

    const row =
      parseNutritionRow(line);

    if (!row) {
      continue;
    }

    const nutrient =
      mapNutrient(
        row.nutrient
      );

    if (!nutrient) {
      continue;
    }

    table[nutrient] = {

      value: row.value,

      unit: row.unit,

      source: line,

    };

  }

  return table;

}