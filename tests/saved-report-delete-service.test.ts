import { describe, expect, it } from "vitest";

describe("saved report delete service", () => {
  it("exports a user-scoped delete service", async () => {
    const service = await import("@/lib/database/saved-report-delete-service");

    expect(typeof service.deleteSavedReportForUser).toBe("function");
  });
});