import { describe, expect, it } from "vitest";
import { createTemporaryOcrInputReference } from "@/lib/analyze/ocr-provider-contract";

describe("OCR provider contract", () => {
  it("keeps OCR input temporary and privacy-safe", () => {
    expect(createTemporaryOcrInputReference("upload")).toEqual({
      source: "upload",
      temporaryOnly: true,
      fileNameStored: false,
      fileSizeStored: false,
      originalImageStored: false,
    });
  });

  it("supports scan input references with the same storage rules", () => {
    const input = createTemporaryOcrInputReference("scan");

    expect(input.source).toBe("scan");
    expect(input.originalImageStored).toBe(false);
    expect(input.fileNameStored).toBe(false);
    expect(input.fileSizeStored).toBe(false);
  });
});