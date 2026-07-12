import type { LayoutSectionType } from "./types";
import { classifyLine } from "./line-classifier";

export type DetectedHeader = {
  lineNumber: number;
  text: string;
  type: LayoutSectionType;
};

export function detectHeaders(
  lines: string[]
): DetectedHeader[] {

  const headers: DetectedHeader[] = [];

  lines.forEach((line, index) => {

    const type = classifyLine(line);

    if (!type) {
      return;
    }

    headers.push({
      lineNumber: index,
      text: line,
      type,
    });

  });

  return headers;

}