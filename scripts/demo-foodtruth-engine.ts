import { generateFoodTruthReport } from "@/lib/engine/foodtruth-engine";
import type { FoodLabelInput } from "@/lib/engine/types";

const demoProduct: FoodLabelInput = {
  productName: "Choco Energy Bar",
  brandName: "Demo Foods",
  category: "Snack",
  servingSizeGrams: 40,
  packSizeGrams: 200,
  calories: 180,
  sugarGrams: 16,
  sodiumMg: 120,
  totalFatGrams: 7,
  saturatedFatGrams: 4,
  proteinGrams: 3,
  fiberGrams: 1,
  ingredients:
    "sugar, refined flour, palm oil, glucose syrup, cocoa solids, emulsifier",
  claims: ["healthy", "energy", "high fiber"],
};

const report = generateFoodTruthReport(demoProduct);

console.log("\nFoodTruth Engine Demo");
console.log("=====================\n");

console.log(`Product: ${report.productName}`);
console.log(`Score: ${report.score}/100`);
console.log(`Grade: ${report.grade}`);
console.log(`Overall Risk Level: ${report.riskLevel}`);

console.log("\nNutrition Load");
console.log("--------------");
console.log(`Sugar Load: ${report.nutritionLoad.sugarLoad}`);
console.log(`Sodium Load: ${report.nutritionLoad.sodiumLoad}`);
console.log(`Saturated Fat Load: ${report.nutritionLoad.saturatedFatLoad}`);
console.log(`Calorie Density: ${report.nutritionLoad.calorieDensity}`);
console.log(`Fiber Support: ${report.nutritionLoad.fiberSupport}`);
console.log(`Protein Support: ${report.nutritionLoad.proteinSupport}`);

console.log("\nIngredient Clarity");
console.log("------------------");
console.log(`Primary Ingredient: ${report.ingredientClarity.primaryIngredient}`);
console.log(`Ingredient Count: ${report.ingredientClarity.ingredientCount}`);
console.log(
  `Sugar Aliases: ${
    report.ingredientClarity.sugarAliasesDetected.join(", ") || "None"
  }`
);
console.log(
  `Additive Indicators: ${
    report.ingredientClarity.additiveIndicatorsDetected.join(", ") || "None"
  }`
);
console.log(`Ingredient Complexity: ${report.ingredientClarity.ingredientComplexity}`);

console.log("\nMarketing Claim Risk");
console.log("--------------------");
console.log(`Overall Claim Risk: ${report.claimRisk.overallRisk}`);

if (report.claimRisk.flaggedClaims.length > 0) {
  report.claimRisk.flaggedClaims.forEach((flag) => {
    console.log(`- ${flag.claim}: ${flag.risk} — ${flag.reason}`);
  });
} else {
  console.log("No claim risks flagged.");
}

console.log("\nServing Size Reality");
console.log("--------------------");
console.log(`Servings Per Pack: ${report.servingSizeReality.servingsPerPack}`);
console.log(`Risk: ${report.servingSizeReality.risk}`);
console.log(`Reason: ${report.servingSizeReality.reason}`);

console.log("\nPlain-English Summary");
console.log("---------------------");
console.log(report.summary);

console.log("\nBetter Choice Checklist");
console.log("-----------------------");
report.betterChoiceChecklist.forEach((item) => {
  console.log(`- ${item}`);
});

console.log("\n");