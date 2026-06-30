import { describe, expect, it } from "vitest";
import {
  isSavedReportSource,
  savedReportDatabasePolicy,
  savedReportSources,
} from "@/lib/database/database-policy";

describe("saved report database policy", () => {
  it("keeps saved reports privacy-respecting", () => {
    expect(savedReportDatabasePolicy.storesOriginalImage).toBe(false);
    expect(savedReportDatabasePolicy.storesFileName).toBe(false);
    expect(savedReportDatabasePolicy.storesFileSize).toBe(false);
    expect(savedReportDatabasePolicy.storesReviewedLabelData).toBe(true);
    expect(savedReportDatabasePolicy.storesReportSignals).toBe(true);
  });

  it("requires user ownership and row-level security", () => {
    expect(savedReportDatabasePolicy.requiresUserOwnership).toBe(true);
    expect(savedReportDatabasePolicy.usesRowLevelSecurity).toBe(true);
  });

  it("supports manual, upload, and scan report sources", () => {
    expect(savedReportSources).toEqual(["manual", "upload", "scan"]);
    expect(isSavedReportSource("manual")).toBe(true);
    expect(isSavedReportSource("upload")).toBe(true);
    expect(isSavedReportSource("scan")).toBe(true);
    expect(isSavedReportSource("unknown")).toBe(false);
  });
});