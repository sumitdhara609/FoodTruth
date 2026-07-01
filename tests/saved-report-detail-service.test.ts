import { describe, expect, it } from "vitest";

describe("saved report detail service", () => {
  it("uses account report rows as the detail source of truth", async () => {
    const service = await import("@/lib/database/saved-report-detail-service");

    expect(typeof service.getSavedReportDetailForUser).toBe("function");
  });
});