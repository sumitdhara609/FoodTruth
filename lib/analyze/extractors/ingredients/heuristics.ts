import { INGREDIENT_END_HEADERS } from "./keywords";

export function cleanIngredientLine(
  line: string
): string {

  return line
    .replace(/\s+/g, " ")
    .trim();

}

export function isIngredientEnd(
  line: string
): boolean {

  const lower =
    line.toLowerCase();

  return INGREDIENT_END_HEADERS.some(
    keyword =>
      lower.startsWith(keyword)
  );

}