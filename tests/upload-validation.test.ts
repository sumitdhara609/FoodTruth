import { describe, expect, it } from "vitest";
import { validateLabelUploadCandidate } from "@/lib/analyze/upload-validation";

describe("upload validation", () => {
  it("accepts supported image files within size limit", () => {
    expect(
      validateLabelUploadCandidate({
        type: "image/jpeg",
        size: 2 * 1024 * 1024,
      })
    ).toEqual({
      success: true,
    });
  });

  it("rejects unsupported file types", () => {
    expect(
      validateLabelUploadCandidate({
        type: "application/pdf",
        size: 1 * 1024 * 1024,
      })
    ).toEqual({
      success: false,
      message: "Use a JPG, PNG, or WEBP label image.",
    });
  });

  it("rejects files above the upload size limit", () => {
    expect(
      validateLabelUploadCandidate({
        type: "image/png",
        size: 4 * 1024 * 1024 + 1,
      })
    ).toEqual({
      success: false,
      message: "Keep the label image under 4 MB.",
    });
  });
});