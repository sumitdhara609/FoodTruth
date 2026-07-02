import { describe, expect, it } from "vitest";
import { scanInputPlaceholder } from "@/lib/analyze/scan-input-placeholder";
import { uploadInputPlaceholder } from "@/lib/analyze/upload-input-placeholder";

describe("input placeholder configuration", () => {
  it("keeps upload placeholder aligned with temporary image handling", () => {
    expect(uploadInputPlaceholder.title).toBe("Upload a label image.");
    expect(uploadInputPlaceholder.buttonLabel).toBe("Open upload review");
    expect(uploadInputPlaceholder.infoItems).toHaveLength(1);
    expect(uploadInputPlaceholder.description).toContain("JPG, PNG, or WEBP");
    expect(uploadInputPlaceholder.description).toContain("temporary input");
  });

  it("keeps scan placeholder aligned with review-first capture", () => {
    expect(scanInputPlaceholder.title).toBe("Prepare a scan review.");
    expect(scanInputPlaceholder.buttonLabel).toBe("Open scan workspace");
    expect(scanInputPlaceholder.infoItems).toHaveLength(2);
    expect(scanInputPlaceholder.description).toContain("review-first workspace");
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