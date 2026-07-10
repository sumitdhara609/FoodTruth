export type ParsedNutritionTable = {
  calories: string;
  sugarGrams: string;
  sodiumMg: string;
  totalFatGrams: string;
  saturatedFatGrams: string;
  proteinGrams: string;
  fiberGrams: string;
};

const normalize = (text: string) =>
  text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const findValue = (
  text: string,
  labels: string[]
): string => {
  for (const line of text.split("\n")) {
    const clean = normalize(line).toLowerCase();

    for (const label of labels) {
      if (!clean.includes(label.toLowerCase())) {
        continue;
      }

      const match = clean.match(/([\d.,]+)/);

      if (match) {
        return match[1];
      }
    }
  }

  return "";
};

export async function parseNutritionTable(
  text: string
): Promise<ParsedNutritionTable> {
  return {
    calories: findValue(text, [
      "energy",
      "kcal",
      "calories",
    ]),

    sugarGrams: findValue(text, [
      "total sugars",
      "sugars",
      "sugar",
    ]),

    sodiumMg: findValue(text, [
      "sodium",
      "salt",
    ]),

    totalFatGrams: findValue(text, [
      "total fat",
      "fat",
    ]),

    saturatedFatGrams: findValue(text, [
      "saturated fat",
      "saturates",
      "sat fat",
    ]),

    proteinGrams: findValue(text, [
      "protein",
    ]),

    fiberGrams: findValue(text, [
      "dietary fibre",
      "dietary fiber",
      "fiber",
      "fibre",
    ]),
  };
}