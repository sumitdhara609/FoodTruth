import { detectHeaders } from "./header-detector";

import type {
  LayoutDocument,
  LayoutSection,
} from "./types";

export function detectSections(
  originalText: string,
  cleanedText: string
): LayoutDocument {

  const lines = cleanedText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  const headers =
    detectHeaders(lines);

  const sections: LayoutSection[] = [];

  if (headers.length === 0) {

    sections.push({

      type: "unknown",

      confidence: 0,

      lines: lines.map((text, index) => ({
        text,
        lineNumber: index,
      })),

    });

    return {

      originalText,

      cleanedText,

      sections,

    };

  }

  for (let i = 0; i < headers.length; i++) {

    const current =
      headers[i];

    const next =
      headers[i + 1];

    const start =
      current.lineNumber;

    const end =
      next
        ? next.lineNumber
        : lines.length;

    sections.push({

      type: current.type,

      confidence: 1,

      lines: lines
        .slice(start, end)
        .map((text, index) => ({

          text,

          lineNumber:
            start + index,

        })),

    });

  }

  return {

    originalText,

    cleanedText,

    sections,

  };

}