import { describe, expect, it } from "vitest";
import { getFirstName, normalizeDisplayName } from "@/lib/auth/name-validation";

describe("name validation", () => {
  it("normalizes display names", () => {
    expect(normalizeDisplayName("  Sumit   Dhara  ")).toBe("Sumit Dhara");
  });

  it("returns first name from full name", () => {
    expect(getFirstName("Sumit Dhara")).toBe("Sumit");
  });

  it("returns fallback when name is missing", () => {
    expect(getFirstName("")).toBe("there");
    expect(getFirstName(null)).toBe("there");
  });
});