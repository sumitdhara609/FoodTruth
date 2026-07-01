import { describe, expect, it } from "vitest";
import { accountSessionCopy } from "@/lib/account/account-session-copy";

describe("account session copy", () => {
  it("keeps account session controls clear", () => {
    expect(accountSessionCopy.eyebrow).toBe("Session");
    expect(accountSessionCopy.title).toContain("Signed in");
    expect(accountSessionCopy.description).toContain("saved reports");
    expect(accountSessionCopy.signOutLabel).toBe("Sign out");
  });
});