import { pipeline } from "@xenova/transformers";

let extractor: Awaited<ReturnType<typeof pipeline>> | null = null;

export async function getAiExtractor() {
  if (extractor) {
    return extractor;
  }

  extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  return extractor;
}