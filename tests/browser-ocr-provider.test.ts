import { describe, expect, it } from "vitest";
import { browserOcrProviderConfig } from "@/lib/analyze/browser-ocr-provider";

describe("browser OCR provider", () => {
  it("keeps browser OCR privacy-safe and review-first", () => {
    expect(browserOcrProviderConfig.provider).toBe("browser");
    expect(browserOcrProviderConfig.language).toBe("eng");
    expect(browserOcrProviderConfig.storesOriginalImage).toBe(false);
    expect(browserOcrProviderConfig.storesFileName).toBe(false);
    expect(browserOcrProviderConfig.storesFileSize).toBe(false);
    expect(browserOcrProviderConfig.requiresUserReview).toBe(true);
    expect(browserOcrProviderConfig.directImageToReport).toBe(false);
  });

  it("exports a browser OCR runner", async () => {
    const providerModule = await import("@/lib/analyze/browser-ocr-provider");

    expect(typeof providerModule.runBrowserOcrExtraction).toBe("function");
  });
});