import { describe, expect, it } from "vitest";
import {
  getPlannedReportActions,
  getReadyReportActions,
  reportActionConfig,
} from "@/lib/report/report-action-config";

describe("report action configuration", () => {
  it("keeps copy and reset ready", () => {
    expect(getReadyReportActions().map((action) => action.key)).toEqual([
      "copy",
      "reset",
    ]);
  });

  it("keeps account-heavy actions planned", () => {
    expect(getPlannedReportActions().map((action) => action.key)).toEqual([
      "save",
      "compare",
      "export",
    ]);
  });

  it("keeps report action keys unique", () => {
    const keys = reportActionConfig.map((action) => action.key);
    const uniqueKeys = new Set(keys);

    expect(uniqueKeys.size).toBe(keys.length);
  });
});