import { describe, expect, it } from "vitest";

describe("scan review actions", () => {
  it("exports a scan-specific save action", async () => {
    const actions = await import("@/app/analyze/scan/review/actions");

    expect(typeof actions.saveScanReviewReportAction).toBe("function");
  });
});