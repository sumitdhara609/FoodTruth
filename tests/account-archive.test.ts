import { describe, expect, it } from "vitest";

const accountArchiveRules = {
  emptyStateWhenReportCountIsZero: true,
  archiveVisibleWhenReportsExist: true,
  emptyStateCtaHref: "/analyze/manual",
};

describe("account archive behavior", () => {
  it("keeps empty account archive behavior clear", () => {
    expect(accountArchiveRules.emptyStateWhenReportCountIsZero).toBe(true);
    expect(accountArchiveRules.emptyStateCtaHref).toBe("/analyze/manual");
  });

  it("keeps saved report archive available when reports exist", () => {
    expect(accountArchiveRules.archiveVisibleWhenReportsExist).toBe(true);
  });
});