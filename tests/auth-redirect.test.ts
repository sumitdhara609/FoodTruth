import { describe, expect, it } from "vitest";
import {
  buildAuthCallbackUrl,
  defaultAuthRedirectPath,
  getSafeAuthRedirectPath,
  isSafeAuthRedirectPath,
} from "@/lib/auth/auth-redirect";

describe("auth redirect safety", () => {
  it("accepts allowed internal auth redirect paths", () => {
    expect(isSafeAuthRedirectPath("/account")).toBe(true);
    expect(isSafeAuthRedirectPath("/analyze")).toBe(true);
    expect(isSafeAuthRedirectPath("/analyze/manual")).toBe(true);
  });

  it("rejects unsafe or unknown redirect paths", () => {
    expect(isSafeAuthRedirectPath("https://example.com")).toBe(false);
    expect(isSafeAuthRedirectPath("//example.com")).toBe(false);
    expect(isSafeAuthRedirectPath("/unknown")).toBe(false);
  });

  it("falls back to default redirect path when next path is unsafe", () => {
    expect(getSafeAuthRedirectPath(null)).toBe(defaultAuthRedirectPath);
    expect(getSafeAuthRedirectPath("https://example.com")).toBe(
      defaultAuthRedirectPath
    );
    expect(getSafeAuthRedirectPath("/unknown")).toBe(defaultAuthRedirectPath);
  });

  it("builds callback URL with a safe next path", () => {
    const callbackUrl = buildAuthCallbackUrl({
      origin: "http://localhost:3000",
      nextPath: "/analyze/manual",
    });

    expect(callbackUrl).toBe(
      "http://localhost:3000/auth/callback?next=%2Fanalyze%2Fmanual"
    );
  });

  it("builds callback URL with default path when next path is unsafe", () => {
    const callbackUrl = buildAuthCallbackUrl({
      origin: "http://localhost:3000",
      nextPath: "https://example.com",
    });

    expect(callbackUrl).toBe(
      "http://localhost:3000/auth/callback?next=%2Faccount"
    );
  });
});