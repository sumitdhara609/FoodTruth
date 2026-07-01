import { describe, expect, it } from "vitest";
import {
  productionBuildChecks,
  requiredPreDeploymentCommands,
} from "@/lib/deployment/build-readiness";

describe("build readiness", () => {
  it("keeps production build checks explicit", () => {
    expect(requiredPreDeploymentCommands).toEqual([
      "npm run build",
      "npm run test:run",
      "npm run lint",
    ]);
  });

  it("tracks production build, test, and lint checks", () => {
    expect(productionBuildChecks.map((check) => check.title)).toEqual([
      "TypeScript build",
      "Test suite",
      "Lint check",
    ]);
  });

  it("keeps every build check documented with a command", () => {
    for (const check of productionBuildChecks) {
      expect(check.description.length).toBeGreaterThan(0);
      expect(check.command).toMatch(/^npm run /);
    }
  });
});