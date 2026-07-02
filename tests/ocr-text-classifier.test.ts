import { describe, expect, it } from "vitest";
import {
  classifyOcrTextBlock,
  createClassifiedOcrTextBlock,
} from "@/lib/analyze/ocr-text-classifier";

describe("OCR text classifier", () => {
  it("classifies nutrition text", () => {
    expect(classifyOcrTextBlock("Energy 126 kcal Sugar 9.6g")).toBe(
      "nutrition"
    );
  });

  it("classifies serving text", () => {
    expect(classifyOcrTextBlock("Serving size 25g")).toBe("serving");
  });

  it("classifies ingredient text", () => {
    expect(classifyOcrTextBlock("Ingredients: whole wheat flour, sugar")).toBe(
      "ingredients"
    );
  });

  it("classifies claim text", () => {
    expect(classifyOcrTextBlock("No added sugar")).toBe("claims");
  });

  it("returns unknown for unclear text", () => {
    expect(classifyOcrTextBlock("Batch number printed near seal")).toBe(
      "unknown"
    );
  });

  it("creates a classified OCR text block", () => {
    const block = createClassifiedOcrTextBlock("Protein 4g");

    expect(block.kind).toBe("nutrition");
    expect(block.confidence).toBe("Unknown");
    expect(block.text).toBe("Protein 4g");
  });
});