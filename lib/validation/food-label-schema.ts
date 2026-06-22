import { z } from "zod";

export const foodLabelInputSchema = z
  .object({
    productName: z
      .string()
      .trim()
      .min(2, "Product name must be at least 2 characters.")
      .max(120, "Product name must be under 120 characters."),

    brandName: z
      .string()
      .trim()
      .max(120, "Brand name must be under 120 characters.")
      .optional(),

    category: z
      .string()
      .trim()
      .max(80, "Category must be under 80 characters.")
      .optional(),

    servingSizeGrams: z
      .number()
      .positive("Serving size must be greater than 0.")
      .max(1000, "Serving size looks too large for a packaged food label."),

    packSizeGrams: z
      .number()
      .positive("Pack size must be greater than 0.")
      .max(10000, "Pack size looks too large for a packaged food label."),

    calories: z
      .number()
      .min(0, "Calories cannot be negative.")
      .max(1500, "Calories per serving looks unusually high."),

    sugarGrams: z
      .number()
      .min(0, "Sugar cannot be negative.")
      .max(300, "Sugar per serving looks unusually high."),

    sodiumMg: z
      .number()
      .min(0, "Sodium cannot be negative.")
      .max(10000, "Sodium per serving looks unusually high."),

    totalFatGrams: z
      .number()
      .min(0, "Total fat cannot be negative.")
      .max(300, "Total fat per serving looks unusually high."),

    saturatedFatGrams: z
      .number()
      .min(0, "Saturated fat cannot be negative.")
      .max(300, "Saturated fat per serving looks unusually high."),

    proteinGrams: z
      .number()
      .min(0, "Protein cannot be negative.")
      .max(300, "Protein per serving looks unusually high."),

    fiberGrams: z
      .number()
      .min(0, "Fiber cannot be negative.")
      .max(300, "Fiber per serving looks unusually high."),

    ingredients: z
      .string()
      .trim()
      .min(2, "Ingredient list is required.")
      .max(5000, "Ingredient list is too long."),

    claims: z.array(z.string().trim().max(120)).max(20),
  })
  .refine((data) => data.packSizeGrams >= data.servingSizeGrams, {
    message: "Pack size should be greater than or equal to serving size.",
    path: ["packSizeGrams"],
  })
  .refine((data) => data.saturatedFatGrams <= data.totalFatGrams, {
    message: "Saturated fat should not be greater than total fat.",
    path: ["saturatedFatGrams"],
  });

export type ValidatedFoodLabelInput = z.infer<typeof foodLabelInputSchema>;