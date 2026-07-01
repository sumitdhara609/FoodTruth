import { describe, expect, it } from "vitest";
import {
  isSavedReportSource,
  savedReportSources,
} from "@/lib/database/database-policy";

describe("saved report source policy", () => {
  it("supports manual, upload, and scan report sources", () => {
    expect(savedReportSources).toEqual(["manual", "upload", "scan"]);
  });

  it("accepts upload as a first-class saved report source", () => {
    expect(isSavedReportSource("upload")).toBe(true);
  });

  it("rejects unknown saved report sources", () => {
    expect(isSavedReportSource("camera")).toBe(false);
    expect(isSavedReportSource("ocr")).toBe(false);
  });
});