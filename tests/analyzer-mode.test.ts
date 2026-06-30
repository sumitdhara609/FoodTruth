import { describe, expect, it } from "vitest";
import { analyzerModes } from "@/lib/analyze/analyzer-mode";

describe("analyzer modes", () => {
  it("keeps manual entry as the only active analyzer mode", () => {
    const activeModes = analyzerModes.filter((mode) => mode.status === "Active");

    expect(activeModes).toHaveLength(1);
    expect(activeModes[0].title).toBe("Manual Entry");
    expect(activeModes[0].href).toBe("/analyze/manual");
  });

  it("keeps upload and scan as planned placeholder routes", () => {
    const uploadMode = analyzerModes.find(
      (mode) => mode.title === "Upload Label"
    );
    const scanMode = analyzerModes.find(
      (mode) => mode.title === "Instant Scan"
    );

    expect(uploadMode?.status).toBe("Planned");
    expect(uploadMode?.href).toBe("/analyze/upload");

    expect(scanMode?.status).toBe("Planned");
    expect(scanMode?.href).toBe("/analyze/scan");
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