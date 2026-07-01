import { describe, expect, it } from "vitest";

describe("upload review actions", () => {
  it("exports an upload-specific save action", async () => {
    const actions = await import("@/app/analyze/upload/review/actions");

    expect(typeof actions.saveUploadReviewReportAction).toBe("function");
  });
});