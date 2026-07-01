import type { ExtractionProviderResult } from "@/lib/analyze/extraction-provider";
import {
  extractionProviderConfig,
  runMockUploadExtraction,
} from "@/lib/analyze/extraction-provider";

export type ExtractionProviderKey = "mock";

export type ExtractionProviderDefinition = {
  key: ExtractionProviderKey;
  label: string;
  description: string;
  run: () => Promise<ExtractionProviderResult>;
};

export const extractionProviders: Record<
  ExtractionProviderKey,
  ExtractionProviderDefinition
> = {
  mock: {
    key: "mock",
    label: "Mock extraction",
    description:
      "Creates a review draft from a known sample label while the real OCR provider is not active.",
    run: runMockUploadExtraction,
  },
};

export const getActiveExtractionProvider = () => {
  return extractionProviders[extractionProviderConfig.activeProvider];
};

export const runActiveUploadExtraction = async () => {
  const provider = getActiveExtractionProvider();

  return provider.run();
};