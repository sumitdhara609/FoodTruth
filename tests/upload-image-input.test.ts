import { describe, expect, it } from "vitest";
import {
  createUploadImageInput,
  isAllowedUploadImageMimeType,
} from "@/lib/analyze/upload-image-input";

describe("upload image input", () => {
  it("accepts supported upload image mime types", () => {
    expect(isAllowedUploadImageMimeType("image/jpeg")).toBe(true);
    expect(isAllowedUploadImageMimeType("image/png")).toBe(true);
    expect(isAllowedUploadImageMimeType("image/webp")).toBe(true);
  });

  it("rejects unsupported upload image mime types", () => {
    expect(isAllowedUploadImageMimeType("image/gif")).toBe(false);
    expect(isAllowedUploadImageMimeType("application/pdf")).toBe(false);
  });

  it("creates a privacy-safe temporary upload input", () => {
    expect(createUploadImageInput("image/jpeg")).toEqual({
      source: "upload",
      mimeType: "image/jpeg",
      temporaryOnly: true,
      fileNameStored: false,
      fileSizeStored: false,
      originalImageStored: false,
    });
  });
});