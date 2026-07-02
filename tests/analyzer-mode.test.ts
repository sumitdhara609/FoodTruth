import { describe, expect, it } from "vitest";
import {
  analyzerModes,
  getActiveAnalyzerModes,
  getPlannedAnalyzerModes,
  isAnalyzerModeActive,
} from "@/lib/analyze/analyzer-mode";

describe("analyzer modes", () => {
  it("keeps manual entry and upload as active analyzer modes", () => {
    const activeModes = getActiveAnalyzerModes();

    expect(activeModes.map((mode) => mode.title)).toEqual([
      "Manual Entry",
      "Upload Label",
    ]);
  });

  it("keeps scan as the foundation analyzer mode", () => {
    const plannedModes = getPlannedAnalyzerModes();

    expect(plannedModes.map((mode) => mode.title)).toEqual(["Instant Scan"]);
    expect(plannedModes[0].status).toBe("Foundation");
  });

  it("identifies active analyzer modes safely", () => {
    const manualMode = analyzerModes.find(
      (mode) => mode.title === "Manual Entry"
    );
    const uploadMode = analyzerModes.find(
      (mode) => mode.title === "Upload Label"
    );
    const scanMode = analyzerModes.find(
      (mode) => mode.title === "Instant Scan"
    );

    expect(manualMode).toBeDefined();
    expect(uploadMode).toBeDefined();
    expect(scanMode).toBeDefined();

    expect(isAnalyzerModeActive(manualMode!)).toBe(true);
    expect(isAnalyzerModeActive(uploadMode!)).toBe(true);
    expect(isAnalyzerModeActive(scanMode!)).toBe(false);
  });

  it("keeps every analyzer mode renderable as a card", () => {
    for (const mode of analyzerModes) {
      expect(mode.title.length).toBeGreaterThan(0);
      expect(mode.description.length).toBeGreaterThan(0);
      expect(mode.href.startsWith("/analyze")).toBe(true);
      expect(mode.icon).toBeDefined();
      expect(mode.actionLabel.length).toBeGreaterThan(0);
    }
  });

  it("keeps analyzer mode routes unique", () => {
    const routes = analyzerModes.map((mode) => mode.href);
    const uniqueRoutes = new Set(routes);

    expect(uniqueRoutes.size).toBe(routes.length);
  });
});