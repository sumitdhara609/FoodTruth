import { parseNutritionRow } from "./row-parser";
import { mapNutrient } from "./nutrient-map";
import { splitNutritionSegments } from "./segment-parser";

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

    const segments =
      splitNutritionSegments(line);

    for (const segment of segments) {

      const row =
        parseNutritionRow(segment);

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

        source: segment,

      };

    }

  }

  return table;

}