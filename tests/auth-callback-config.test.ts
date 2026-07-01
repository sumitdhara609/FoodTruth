import { describe, expect, it } from "vitest";
import { authCallbackConfig } from "@/lib/auth/auth-callback-config";

describe("auth callback config", () => {
  it("keeps auth callback query parameters explicit", () => {
    expect(authCallbackConfig.codeParam).toBe("code");
    expect(authCallbackConfig.nextParam).toBe("next");
  });

  it("redirects confirmed users to account by default", () => {
    expect(authCallbackConfig.defaultRedirectPath).toBe("/account");
  });

  it("keeps default redirect path absolute", () => {
    expect(authCallbackConfig.defaultRedirectPath.startsWith("/")).toBe(true);
  });
});