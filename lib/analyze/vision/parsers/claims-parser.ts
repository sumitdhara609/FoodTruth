const CLAIMS = [
  "high protein",
  "high fibre",
  "high fiber",
  "low fat",
  "low sugar",
  "no added sugar",
  "organic",
  "natural",
  "gluten free",
  "vegan",
];

export function parseClaims(
  text: string
): string[] {
  const lower = text.toLowerCase();

  return CLAIMS.filter((claim) =>
    lower.includes(claim)
  );
}