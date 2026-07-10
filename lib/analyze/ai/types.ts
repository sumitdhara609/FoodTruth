export type AiConfidence = "High" | "Medium" | "Low";

export type AiExtractedValue<T = string> = {
  value: T;
  confidence: AiConfidence;
};

export type NutritionExtraction = {
  calories?: AiExtractedValue<string>;
  sugarGrams?: AiExtractedValue<string>;
  sodiumMg?: AiExtractedValue<string>;
  totalFatGrams?: AiExtractedValue<string>;
  saturatedFatGrams?: AiExtractedValue<string>;
  proteinGrams?: AiExtractedValue<string>;
  fiberGrams?: AiExtractedValue<string>;
};

export type ProductExtraction = {
  productName?: AiExtractedValue<string>;
  brandName?: AiExtractedValue<string>;
  category?: AiExtractedValue<string>;
};

export type ServingExtraction = {
  servingSizeGrams?: AiExtractedValue<string>;
  packSizeGrams?: AiExtractedValue<string>;
};

export type IngredientExtraction = {
  ingredients?: AiExtractedValue<string>;
};

export type ClaimsExtraction = {
  claims?: AiExtractedValue<string>;
};

export type FoodLabelAiResult = {
  product: ProductExtraction;
  nutrition: NutritionExtraction;
  serving: ServingExtraction;
  ingredients: IngredientExtraction;
  claims: ClaimsExtraction;
};