import type { LayoutDocument } from "@/lib/analyze/layout/types";

import {
  createEvidence,
  type ExtractedField,
  type ExtractionConfidence,
} from "../shared";

import {
  IdentityData,
  IdentityExtractorResult,
} from "./types";

import {
  CATEGORY_KEYWORDS,
} from "./keywords";

import {
  cleanIdentityLine,
  looksLikeHeader,
} from "./heuristics";

function emptyField(
  extractor: string
): ExtractedField<string> {
  return {
    value: "",
    confidence: "Unknown",
    extractor,
    evidence: [],
  };
}

function confidence(
  found: boolean
): ExtractionConfidence {
  return found ? "Medium" : "Unknown";
}

export function extractIdentity(
  document: LayoutDocument
): IdentityExtractorResult {

  const brand = emptyField("identity");
  const product = emptyField("identity");
  const category = emptyField("identity");

  //
  // Read only identity section.
  // If it doesn't exist,
  // fall back to unknown.
  //

  const identitySection =
    document.sections.find(
      section =>
        section.type === "identity"
    ) ??
    document.sections.find(
      section =>
        section.type === "unknown"
    );

  if (!identitySection) {

    return {
      success: false,
      warnings: [
        "No identity section detected.",
      ],
      data: {
        brand,
        productName: product,
        category,
      },
    };

  }

  const usableLines =
    identitySection.lines
      .map(line => ({
        ...line,
        text: cleanIdentityLine(
          line.text
        ),
      }))
      .filter(
        line =>
          line.text.length > 0 &&
          !looksLikeHeader(
            line.text
          )
      );

  //
  // Brand
  //

  if (usableLines.length > 0) {

    brand.value =
      usableLines[0].text;

    brand.confidence =
      confidence(true);

    brand.evidence = [
      createEvidence(
        usableLines[0].text,
        usableLines[0].lineNumber
      ),
    ];

  }

  //
  // Product Name
  //

  if (usableLines.length > 1) {

    product.value =
      usableLines[1].text;

    product.confidence =
      confidence(true);

    product.evidence = [
      createEvidence(
        usableLines[1].text,
        usableLines[1].lineNumber
      ),
    ];

  }

  //
  // Category
  //

  for (const line of usableLines) {

    const lower =
      line.text.toLowerCase();

    const keyword =
      CATEGORY_KEYWORDS.find(
        category =>
          lower.includes(category)
      );

    if (!keyword) {
      continue;
    }

    category.value =
      keyword;

    category.confidence =
      "High";

    category.evidence = [
      createEvidence(
        line.text,
        line.lineNumber
      ),
    ];

    break;

  }

  const data: IdentityData = {

    brand,

    productName: product,

    category,

  };

  return {

    success: true,

    warnings: [],

    data,

  };

}