import { describe, expect, it } from "vitest";
import {
  appNavigationLinks,
  authNavigationLinks,
} from "@/lib/navigation/app-navigation";

describe("app navigation", () => {
  it("keeps primary app navigation routes available", () => {
    expect(appNavigationLinks).toEqual([
      {
        label: "Analyze",
        href: "/analyze",
      },
      {
        label: "Account",
        href: "/account",
      },
      {
        label: "System",
        href: "/system",
      },
    ]);
  });

  it("keeps auth navigation routes available", () => {
    expect(authNavigationLinks).toEqual([
      {
        label: "Sign in",
        href: "/auth/sign-in",
      },
      {
        label: "Create account",
        href: "/auth/sign-up",
      },
    ]);
  });

  it("keeps all navigation routes absolute", () => {
    const allLinks = [...appNavigationLinks, ...authNavigationLinks];

    for (const link of allLinks) {
      expect(link.href).toMatch(/^\//);
    }
  });
});