import { foodLabelInputSchema } from "@/lib/validation/food-label-schema";
import { generateFoodTruthReport } from "./foodtruth-engine";
import type { ValidatedFoodTruthResult } from "./types";

export const generateValidatedFoodTruthReport = (
  input: unknown
): ValidatedFoodTruthResult => {
  const validation = foodLabelInputSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join(".") || "input",
        message: issue.message,
      })),
    };
  }

  return {
    success: true,
    report: generateFoodTruthReport(validation.data),
  };
};