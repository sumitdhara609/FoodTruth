export type ConfidenceLevel =
  | "High"
  | "Medium"
  | "Low";

export function calculateConfidence(
  value: string
): ConfidenceLevel {
  if (!value.trim()) {
    return "Low";
  }

  if (value.length >= 3) {
    return "High";
  }

  return "Medium";
}