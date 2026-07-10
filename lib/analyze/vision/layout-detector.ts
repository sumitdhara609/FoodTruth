export type LabelLayout = {
  nutrition: string;
  ingredients: string;
  claims: string;
  product: string;
};

const findSection = (
  text: string,
  keywords: string[]
): string => {
  const lines = text.split("\n");

  const collected: string[] = [];

  let collecting = false;

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (
      keywords.some((k) => lower.includes(k))
    ) {
      collecting = true;
    }

    if (collecting) {
      collected.push(line);
    }
  }

  return collected.join("\n").trim();
};

export function detectLabelLayout(
  cleanedText: string
): LabelLayout {
  return {
    nutrition: findSection(cleanedText, [
      "nutrition",
      "energy",
      "calories",
    ]),

    ingredients: findSection(cleanedText, [
      "ingredients",
    ]),

    claims: findSection(cleanedText, [
      "high protein",
      "no added sugar",
      "natural",
      "organic",
      "healthy",
    ]),

    product: cleanedText
      .split("\n")
      .slice(0, 6)
      .join("\n"),
  };
}