import { describe, expect, it } from "vitest";
import { scanInputPlaceholder } from "@/lib/analyze/scan-input-placeholder";
import { uploadInputPlaceholder } from "@/lib/analyze/upload-input-placeholder";

describe("input placeholder configuration", () => {
  it("keeps upload placeholder aligned with temporary image handling", () => {
    expect(uploadInputPlaceholder.title).toBe(
      "Label image upload will appear here."
    );
    expect(uploadInputPlaceholder.buttonLabel).toBe("Upload coming later");
    expect(uploadInputPlaceholder.infoItems).toHaveLength(1);
    expect(uploadInputPlaceholder.description).toContain("JPG, PNG, or WEBP");
  });

  it("keeps scan placeholder aligned with review-first capture", () => {
    expect(scanInputPlaceholder.title).toBe("Camera scan will appear here.");
    expect(scanInputPlaceholder.buttonLabel).toBe("Scan coming later");
    expect(scanInputPlaceholder.infoItems).toHaveLength(2);
    expect(scanInputPlaceholder.infoItems.map((item) => item.eyebrow)).toEqual([
      "Review first",
      "Storage rule",
    ]);
  });

  it("provides icons and descriptions for every input info item", () => {
    const allItems = [
      ...uploadInputPlaceholder.infoItems,
      ...scanInputPlaceholder.infoItems,
    ];

    for (const item of allItems) {
      expect(item.icon).toBeDefined();
      expect(item.description.length).toBeGreaterThan(0);
    }
  });
});