export type ProductResult = {
  productName: string;
  brandName: string;
  category: string;
};

const CATEGORY_KEYWORDS = [
  "chips",
  "biscuits",
  "cookies",
  "chocolate",
  "milk",
  "drink",
  "juice",
  "cereal",
  "noodles",
  "snack",
  "ice cream",
];

export function parseProduct(
  text: string
): ProductResult {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const productName = lines[0] ?? "";

  const brandName = lines[1] ?? "";

  const lower = text.toLowerCase();

  const category =
    CATEGORY_KEYWORDS.find((item) =>
      lower.includes(item)
    ) ?? "Packaged Food";

  return {
    productName,
    brandName,
    category,
  };
}