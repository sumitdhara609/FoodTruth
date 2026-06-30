import { describe, expect, it } from "vitest";
import { analyzerModes } from "@/lib/analyze/analyzer-mode";

describe("analyzer modes", () => {
  it("keeps manual entry as the only active analyzer mode", () => {
    const activeModes = analyzerModes.filter((mode) => mode.status === "Active");

    expect(activeModes).toHaveLength(1);
    expect(activeModes[0].title).toBe("Manual Entry");
    expect(activeModes[0].href).toBe("/analyze/manual");
  });

  it("keeps planned analyzer modes non-routable for now", () => {
    const plannedModes = analyzerModes.filter(
      (mode) => mode.status === "Planned"
    );

    expect(plannedModes.length).toBeGreaterThan(0);

    for (const mode of plannedModes) {
      expect(mode.href).toBe("#");
    }
  });
});