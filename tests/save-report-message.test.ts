import { describe, expect, it } from "vitest";
import { saveReportMessages } from "@/lib/report/save-report-message";

describe("save report messages", () => {
  it("keeps signed-out save flow clear", () => {
    expect(saveReportMessages.signedOut).toBe(
      "Please sign in before saving this report."
    );
  });

  it("keeps invalid report save flow clear", () => {
    expect(saveReportMessages.invalidReport).toBe(
      "Please correct the label details before saving this report."
    );
  });

  it("keeps saved report confirmation clear", () => {
    expect(saveReportMessages.saved).toBe(
      "Report saved to your FoodTruth account."
    );
  });
});