import type { ProductExtraction } from "./types";

export async function extractProductInformation(
  text: string
): Promise<ProductExtraction> {
  const lines = text
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

  return {
    productName: {
      value: lines[0] ?? "",
      confidence: "Medium",
    },
    brandName: {
      value: "",
      confidence: "Low",
    },
    category: {
      value: "Packaged Food",
      confidence: "Medium",
    },
  };
}