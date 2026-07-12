import type { LayoutSectionType } from "./types";

const HEADERS: Record<string, LayoutSectionType> = {

  ingredients: "ingredients",

  ingredient: "ingredients",

  "nutrition information": "nutrition",

  nutrition: "nutrition",

  "nutrition facts": "nutrition",

  serving: "serving",

  claims: "claims",

  manufactured: "manufacturer",

  marketed: "manufacturer",

  storage: "storage",

  warning: "warning",

};

export function classifyLine(
  line: string
): LayoutSectionType | null {

  const lower =
    line.toLowerCase().trim();

  for (const key of Object.keys(HEADERS)) {

    if (lower.startsWith(key)) {
      return HEADERS[key];
    }

  }

  return null;

}