import { describe, expect, it } from "vitest";
import {
  findNumberAfterAnyLabel,
  findNumberAfterLabel,
  normalizeOcrNumber,
} from "@/lib/analyze/ocr-numeric-parser";

describe("OCR numeric parser", () => {
  it("normalizes comma decimal numbers", () => {
    expect(normalizeOcrNumber("9,68")).toBe("9.68");
  });

  it("finds a number after a direct label", () => {
    expect(findNumberAfterLabel("Sugar 9.68g", "sugar")).toBe("9.68");
  });

  it("finds a number after a label with colon", () => {
    expect(findNumberAfterLabel("Energy: 126.91 kcal", "energy")).toBe(
      "126.91"
    );
  });

  it("finds a number from multiple possible labels", () => {
    const match = findNumberAfterAnyLabel({
      text: "Sugars 9.68 g",
      labels: ["sugar", "sugars"],
    });

    expect(match?.label).toBe("sugars");
    expect(match?.value).toBe("9.68");
  });

  it("returns null when no label is found", () => {
    const match = findNumberAfterAnyLabel({
      text: "Batch number A102",
      labels: ["sugar"],
    });

    expect(match).toBeNull();
  });
});