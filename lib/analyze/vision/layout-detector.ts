export type LayoutSections = {
  product: string;
  nutrition: string;
  ingredients: string;
 serving: string;
  claims: string;
};

const HEADINGS = {
  nutrition: [
    "nutrition information",
    "nutritional information",
    "nutrition facts",
    "nutritional facts",
  ],

  ingredients: [
    "ingredients",
    "ingredient list",
  ],

  serving: [
    "serving size",
    "servings per pack",
  ],

  claims: [
    "claims",
    "highlights",
    "benefits",
  ],
} as const;

function findHeadingIndex(
  lowerText: string,
  headings: readonly string[]
): number {
  for (const heading of headings) {
    const index = lowerText.indexOf(heading);

    if (index !== -1) {
      return index;
    }
  }

  return -1;
}

function sliceSection(
  text: string,
  start: number,
  end: number
): string {
  if (start === -1) {
    return "";
  }

  return text.slice(start, end).trim();
}

export function detectLayout(
  text: string
): LayoutSections {
  const lower = text.toLowerCase();

  const nutritionStart = findHeadingIndex(
    lower,
    HEADINGS.nutrition
  );

  const ingredientsStart = findHeadingIndex(
    lower,
    HEADINGS.ingredients
  );

  const servingStart = findHeadingIndex(
    lower,
    HEADINGS.serving
  );

  const claimsStart = findHeadingIndex(
    lower,
    HEADINGS.claims
  );

  const positions = [
    nutritionStart,
    ingredientsStart,
    servingStart,
    claimsStart,
  ]
    .filter((p) => p !== -1)
    .sort((a, b) => a - b);

  const nextSection = (current: number) => {
    if (current === -1) {
      return text.length;
    }

    for (const p of positions) {
      if (p > current) {
        return p;
      }
    }

    return text.length;
  };

  const firstSection =
    positions.length > 0 ? positions[0] : text.length;

  return {
    product: text.slice(0, firstSection).trim(),

    nutrition: sliceSection(
      text,
      nutritionStart,
      nextSection(nutritionStart)
    ),

    ingredients: sliceSection(
      text,
      ingredientsStart,
      nextSection(ingredientsStart)
    ),

    serving: sliceSection(
      text,
      servingStart,
      nextSection(servingStart)
    ),

    claims: sliceSection(
      text,
      claimsStart,
      nextSection(claimsStart)
    ),
  };
}