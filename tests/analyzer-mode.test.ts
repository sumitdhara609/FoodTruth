import { describe, expect, it } from "vitest";
import {
  analyzerModes,
  getActiveAnalyzerModes,
  getPlannedAnalyzerModes,
  isAnalyzerModeActive,
} from "@/lib/analyze/analyzer-mode";

describe("analyzer modes", () => {
  it("keeps manual entry as the only active analyzer mode", () => {
    const activeModes = getActiveAnalyzerModes();

    expect(activeModes).toHaveLength(1);
    expect(activeModes[0].title).toBe("Manual Entry");
    expect(activeModes[0].href).toBe("/analyze/manual");
  });

  it("keeps upload and scan as planned placeholder routes", () => {
    const plannedModes = getPlannedAnalyzerModes();

    expect(plannedModes.map((mode) => mode.title)).toEqual([
      "Upload Label",
      "Instant Scan",
    ]);
    expect(plannedModes.map((mode) => mode.href)).toEqual([
      "/analyze/upload",
      "/analyze/scan",
    ]);
  });

  it("identifies active analyzer modes safely", () => {
    const manualMode = analyzerModes.find((mode) => mode.title === "Manual Entry");
    const uploadMode = analyzerModes.find((mode) => mode.title === "Upload Label");

    expect(manualMode).toBeDefined();
    expect(uploadMode).toBeDefined();

    expect(isAnalyzerModeActive(manualMode!)).toBe(true);
    expect(isAnalyzerModeActive(uploadMode!)).toBe(false);
  });

  it("keeps every analyzer mode renderable as a card", () => {
    for (const mode of analyzerModes) {
      expect(mode.title.length).toBeGreaterThan(0);
      expect(mode.description.length).toBeGreaterThan(0);
      expect(mode.href).toMatch(/^\/analyze/);
      expect(mode.icon).toBeDefined();
    }
  });

  it("keeps analyzer mode routes unique", () => {
    const routes = analyzerModes.map((mode) => mode.href);
    const uniqueRoutes = new Set(routes);

    expect(uniqueRoutes.size).toBe(routes.length);
  });
});