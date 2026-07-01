import { describe, expect, it } from "vitest";
import {
  getSystemStatusCounts,
  systemStatusItems,
} from "@/lib/system/system-status";

describe("system status", () => {
  it("tracks key FoodTruth product areas", () => {
    expect(systemStatusItems.map((item) => item.title)).toEqual([
      "Manual analyzer",
      "Account authentication",
      "Saved reports",
      "Database policy",
      "Deployment readiness",
      "Upload analysis",
      "Scan analysis",
    ]);
  });

  it("counts ready, in-progress, and planned items", () => {
    const counts = getSystemStatusCounts();

    expect(counts.Ready).toBeGreaterThanOrEqual(4);
    expect(counts["In Progress"]).toBeGreaterThanOrEqual(1);
    expect(counts.Planned).toBeGreaterThanOrEqual(2);
  });

  it("keeps upload and scan marked as planned", () => {
    const upload = systemStatusItems.find(
      (item) => item.title === "Upload analysis"
    );
    const scan = systemStatusItems.find(
      (item) => item.title === "Scan analysis"
    );

    expect(upload?.status).toBe("Planned");
    expect(scan?.status).toBe("Planned");
  });
});