import { getAiExtractor } from "./model";

const PRODUCT_KEYWORDS = [
  "chips",
  "cookies",
  "biscuits",
  "juice",
  "drink",
  "milk",
  "chocolate",
  "noodles",
  "bread",
];

export async function enhanceFoodLabelText(
  text: string
): Promise<string> {
  try {
    const extractor = await getAiExtractor();

    await extractor(text, {} as any);

    let cleaned = text;

    cleaned = cleaned.replace(/\s+/g, " ");

    cleaned = cleaned.replace(/[|]/g, " ");

    cleaned = cleaned.replace(/\bO\b/g, "0");

    cleaned = cleaned.replace(/\bl\b/g, "1");

    PRODUCT_KEYWORDS.forEach((word) => {
      const regex = new RegExp(word, "ig");
      cleaned = cleaned.replace(regex, word);
    });

    return cleaned.trim();
  } catch {
    return text;
  }
}