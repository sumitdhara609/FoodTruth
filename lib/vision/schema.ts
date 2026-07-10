export type VisionNutrition = {
  servingSizeGrams: number | null;
  servingsPerPack: number | null;

  calories: number | null;
  sugarGrams: number | null;
  sodiumMg: number | null;

  totalFatGrams: number | null;
  saturatedFatGrams: number | null;

  proteinGrams: number | null;
  fiberGrams: number | null;
};

export type VisionExtraction = {
  productName: string | null;
  brandName: string | null;
  category: string | null;

  nutrition: VisionNutrition;

  ingredients: string[];

  claims: string[];

  warnings: string[];

  confidence: number;
};

export const emptyVisionExtraction = (): VisionExtraction => ({
  productName: null,
  brandName: null,
  category: null,

  nutrition: {
    servingSizeGrams: null,
    servingsPerPack: null,

    calories: null,
    sugarGrams: null,
    sodiumMg: null,

    totalFatGrams: null,
    saturatedFatGrams: null,

    proteinGrams: null,
    fiberGrams: null,
  },

  ingredients: [],

  claims: [],

  warnings: [],

  confidence: 0,
});