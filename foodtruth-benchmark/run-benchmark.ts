import fs from "node:fs/promises";
import path from "node:path";

import {
  runBenchmarkCase,
} from "@/lib/analyze/benchmark";

import {
  createExtractionDraftField,
} from "@/lib/analyze/extraction-draft";

async function main() {

  const rawText =
    await fs.readFile(
      path.join(
        process.cwd(),
        "foodtruth-benchmark",
        "labels",
        "sample-label.txt"
      ),
      "utf8"
    );

  const expectedJson =
    JSON.parse(
      await fs.readFile(
        path.join(
          process.cwd(),
          "foodtruth-benchmark",
          "expected",
          "sample-label.json"
        ),
        "utf8"
      )
    );

  const expected = {

    productName:
      createExtractionDraftField({
        value: expectedJson.productName,
      }),

    brandName:
      createExtractionDraftField({
        value: expectedJson.brandName,
      }),

    category:
      createExtractionDraftField({
        value: expectedJson.category,
      }),

    servingSizeGrams:
      createExtractionDraftField({
        value:
          expectedJson.servingSizeGrams,
      }),

    packSizeGrams:
      createExtractionDraftField({
        value:
          expectedJson.packSizeGrams,
      }),

    calories:
      createExtractionDraftField({
        value:
          expectedJson.calories,
      }),

    sugarGrams:
      createExtractionDraftField({
        value:
          expectedJson.sugarGrams,
      }),

    sodiumMg:
      createExtractionDraftField({
        value:
          expectedJson.sodiumMg,
      }),

    totalFatGrams:
      createExtractionDraftField({
        value:
          expectedJson.totalFatGrams,
      }),

    saturatedFatGrams:
      createExtractionDraftField({
        value:
          expectedJson.saturatedFatGrams,
      }),

    proteinGrams:
      createExtractionDraftField({
        value:
          expectedJson.proteinGrams,
      }),

    fiberGrams:
      createExtractionDraftField({
        value:
          expectedJson.fiberGrams,
      }),

    ingredients:
      createExtractionDraftField({
        value:
          expectedJson.ingredients,
      }),

    claims:
      createExtractionDraftField({
        value:
          expectedJson.claims,
      }),

  };

  const result =
    await runBenchmarkCase({

      id: "sample",

      name: "Sample Label",

      rawOcrText: rawText,

      expected,

    });

  console.log(result);

}

main();