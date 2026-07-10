import type { ClaimsExtraction } from "./types";

const knownClaims = [
  "high protein",
  "high fibre",
  "high fiber",
  "no added sugar",
  "natural",
  "organic",
  "whole grain",
  "low fat",
  "gluten free",
  "vegan",
];

export async function extractClaims(
  text: string
): Promise<ClaimsExtraction> {
  const lower = text.toLowerCase();

  const found = knownClaims.filter((claim) =>
    lower.includes(claim)
  );

  return {
    claims: {
      value: found.join(", "),
      confidence: found.length ? "High" : "Low",
    },
  };
}