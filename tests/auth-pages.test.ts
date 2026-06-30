import { describe, expect, it } from "vitest";

const authRoutes = ["/auth/sign-up", "/auth/sign-in"];

describe("auth routes", () => {
  it("keeps auth routes under the auth segment", () => {
    for (const route of authRoutes) {
      expect(route).toMatch(/^\/auth\//);
    }
  });

  it("keeps sign up and sign in routes distinct", () => {
    expect(new Set(authRoutes).size).toBe(authRoutes.length);
  });
});