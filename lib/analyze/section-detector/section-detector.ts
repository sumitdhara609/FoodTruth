import type { OcrSections } from "./types";

const startsWithAny = (
  line: string,
  values: string[]
) => {
  const upper = line.toUpperCase();

  return values.some((value) =>
    upper.startsWith(value)
  );
};

export function detectSections(
  text: string
): OcrSections {

  const sections: OcrSections = {
    identity: [],
    ingredients: [],
    nutrition: [],
    claims: [],
    warnings: [],
    storage: [],
    manufacturer: [],
    other: [],
  };

  const lines = text
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);

  let current: keyof OcrSections = "identity";

  for (const line of lines) {

    const upper = line.toUpperCase();

    //
    // INGREDIENTS
    //

    if (
      startsWithAny(upper, [
        "INGREDIENT",
        "INGREDIENTS"
      ])
    ) {

      current = "ingredients";

      sections[current].push(line);

      continue;
    }

    //
    // NUTRITION
    //

    if (
      startsWithAny(upper, [
        "NUTRITION",
        "NUTRITIONAL",
        "NUTRITION INFORMATION",
        "NUTRITION FACTS"
      ])
    ) {

      current = "nutrition";

      sections[current].push(line);

      continue;
    }

    //
    // STORAGE
    //

    if (
      upper.includes("STORE IN") ||
      upper.includes("STORE AT") ||
      upper.includes("STORE")
    ) {

      current = "storage";

      sections[current].push(line);

      continue;
    }

    //
    // WARNING
    //

    if (
      upper.includes("DO NOT BUY") ||
      upper.includes("KEEP AWAY") ||
      upper.includes("WARNING")
    ) {

      current = "warnings";

      sections[current].push(line);

      continue;
    }

    //
    // MANUFACTURER
    //

    if (
      upper.includes("MFD") ||
      upper.includes("BEST BEFORE") ||
      upper.includes("MARKETED BY") ||
      upper.includes("MANUFACTURED BY")
    ) {

      current = "manufacturer";

      sections[current].push(line);

      continue;
    }

    //
    // Ignore recycling / QR / batch
    //

    if (
      upper.includes("RECYCLE") ||
      upper.includes("QR") ||
      upper.includes("BATCH") ||
      upper.includes("NS/BN") ||
      upper.includes("NET WT")
    ) {

      continue;
    }

    sections[current].push(line);

  }

  return sections;

}