import { describe, expect, it } from "vitest";
import { accountSignals } from "@/lib/account/account-signal";

describe("account signals", () => {
  it("keeps the account foundation signals visible", () => {
    expect(accountSignals.map((signal) => signal.title)).toEqual([
      "Saved label records",
      "Badge progress",
      "Data-light records",
    ]);
  });

  it("provides descriptions and icons for every account signal", () => {
    for (const signal of accountSignals) {
      expect(signal.description.length).toBeGreaterThan(0);
      expect(signal.icon).toBeDefined();
    }
  });
});