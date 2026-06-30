import { describe, expect, it } from "vitest";
import { analyzerModes } from "@/lib/analyze/analyzer-mode";

describe("analyzer modes", () => {
  it("keeps manual entry as the only active analyzer mode", () => {
    const activeModes = analyzerModes.filter((mode) => mode.status === "Active");

    expect(activeModes).toHaveLength(1);
    expect(activeModes[0].title).toBe("Manual Entry");
    expect(activeModes[0].href).toBe("/analyze/manual");
  });

  it("keeps instant scan non-routable while upload has a placeholder route", () => {
  const uploadMode = analyzerModes.find((mode) => mode.title === "Upload Label");
  const scanMode = analyzerModes.find((mode) => mode.title === "Instant Scan");

  expect(uploadMode?.status).toBe("Planned");
  expect(uploadMode?.href).toBe("/analyze/upload");

  expect(scanMode?.status).toBe("Planned");
  expect(scanMode?.href).toBe("#");
});
});