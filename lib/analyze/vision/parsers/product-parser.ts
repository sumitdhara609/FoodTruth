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

export function parseProductSection(
  text: string
): ProductResult {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const productName = lines[0] ?? "";

  const brandName =
    lines.length > 1 ? lines[1] : "";

  const lower = text.toLowerCase();

  const category =
    CATEGORY_KEYWORDS.find((c) =>
      lower.includes(c)
    ) ?? "Packaged Food";

  return {
    productName,
    brandName,
    category,
  };
}