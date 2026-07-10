const START = [
  "ingredients",
];

export function parseIngredientSection(
  text: string
) {
  const lower = text.toLowerCase();

  for (const key of START) {
    const index = lower.indexOf(key);

    if (index >= 0) {
      return text
        .substring(index + key.length)
        .trim();
    }
  }

  return "";
}