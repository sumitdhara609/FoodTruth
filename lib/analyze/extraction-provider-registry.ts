import type { ExtractionProviderResult } from "@/lib/analyze/extraction-provider";
import {
  extractionProviderConfig,
  runMockUploadExtraction,
} from "@/lib/analyze/extraction-provider";

export type ExtractionProviderKey = "mock" | "ocr";

export type ExtractionProviderDefinition = {
  key: ExtractionProviderKey;
  label: string;
  description: string;
  status: "Active" | "Planned";
  run: () => Promise<ExtractionProviderResult>;
};

const runUnavailableOcrExtraction =
  async (): Promise<ExtractionProviderResult> => {
    return {
      success: false,
      status: "Unavailable",
      message:
        "OCR extraction is planned but not active yet. Use the review form or extraction draft for now.",
    };
  };

export const extractionProviders: Record<
  ExtractionProviderKey,
  ExtractionProviderDefinition
> = {
  mock: {
    key: "mock",
    label: "Draft extraction",
    description:
      "Creates a review draft while real OCR extraction is not active.",
    status: "Active",
    run: runMockUploadExtraction,
  },
  ocr: {
    key: "ocr",
    label: "OCR extraction",
    description:
      "Future OCR provider that will convert uploaded labels into review drafts.",
    status: "Planned",
    run: runUnavailableOcrExtraction,
  },
};

export const getActiveExtractionProvider = () => {
  return extractionProviders[extractionProviderConfig.activeProvider];
};

export const getPlannedExtractionProviders = () => {
  return Object.values(extractionProviders).filter(
    (provider) => provider.status === "Planned"
  );
};

export const runActiveUploadExtraction = async () => {
  const provider = getActiveExtractionProvider();

  return provider.run();
};