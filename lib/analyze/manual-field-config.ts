import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";

export type ManualNumericField = {
  key: keyof Pick<
    ManualAnalyzerState,
    | "servingSizeGrams"
    | "packSizeGrams"
    | "calories"
    | "sugarGrams"
    | "sodiumMg"
    | "totalFatGrams"
    | "saturatedFatGrams"
    | "proteinGrams"
    | "fiberGrams"
  >;
  label: string;
  placeholder: string;
};

export const servingFields: ManualNumericField[] = [
  {
    key: "servingSizeGrams",
    label: "Serving size",
    placeholder: "40",
  },
  {
    key: "packSizeGrams",
    label: "Pack size",
    placeholder: "200",
  },
];

export const nutritionFields: ManualNumericField[] = [
  {
    key: "calories",
    label: "Calories",
    placeholder: "180",
  },
  {
    key: "sugarGrams",
    label: "Sugar",
    placeholder: "12",
  },
  {
    key: "sodiumMg",
    label: "Sodium",
    placeholder: "110",
  },
  {
    key: "totalFatGrams",
    label: "Total fat",
    placeholder: "6",
  },
  {
    key: "saturatedFatGrams",
    label: "Saturated fat",
    placeholder: "2",
  },
  {
    key: "proteinGrams",
    label: "Protein",
    placeholder: "4",
  },
  {
    key: "fiberGrams",
    label: "Fiber",
    placeholder: "2",
  },
];