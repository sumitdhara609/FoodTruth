export function cleanIdentityLine(
  line: string
): string {

  return line
    .replace(/\s+/g, " ")
    .trim();

}

export function looksLikeHeader(
  line: string
): boolean {

  const lower =
    line.toLowerCase();

  return (
    lower.includes("ingredient") ||
    lower.includes("nutrition") ||
    lower.includes("manufactured") ||
    lower.includes("storage") ||
    lower.includes("warning")
  );

}