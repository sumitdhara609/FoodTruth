import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";

const invalidProduct = {
  productName: "",
  brandName: "Demo Foods",
  category: "Snack",
  servingSizeGrams: 100,
  packSizeGrams: 40,
  calories: 180,
  sugarGrams: -5,
  sodiumMg: 120,
  totalFatGrams: 2,
  saturatedFatGrams: 4,
  proteinGrams: 3,
  fiberGrams: 1,
  ingredients: "",
  claims: ["healthy"],
};

const result = generateValidatedFoodTruthReport(invalidProduct);

console.log("\nFoodTruth Validation Demo");
console.log("=========================\n");

if (result.success) {
  console.log("Unexpected success. The invalid product passed validation.");
  process.exit(1);
}

console.log("Validation failed safely:\n");

result.errors.forEach((error) => {
  console.log(`- ${error.field}: ${error.message}`);
});

console.log("\n");