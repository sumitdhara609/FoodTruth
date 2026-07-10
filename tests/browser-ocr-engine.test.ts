import { describe, expect, it } from "vitest";
import { runBrowserOcrEngine } from "@/lib/analyze/browser-ocr-engine";

describe("browser OCR engine", () => {
  it("exports the OCR engine", () => {
    expect(typeof runBrowserOcrEngine).toBe("function");
  });
});