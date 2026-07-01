import { describe, expect, it } from "vitest";
import {
  appNavigationLinks,
  authNavigationLinks,
} from "@/lib/navigation/app-navigation";
import { getVisibleNavigationLinks } from "@/lib/navigation/navigation-visibility";

describe("navigation visibility", () => {
  it("shows auth links and hides account when signed out", () => {
    const links = getVisibleNavigationLinks({
      isSignedIn: false,
      appLinks: appNavigationLinks,
      authLinks: authNavigationLinks,
    });

    expect(links.map((link) => link.href)).toEqual([
      "/analyze",
      "/system",
      "/auth/sign-in",
      "/auth/sign-up",
    ]);
  });

  it("shows account and hides auth links when signed in", () => {
    const links = getVisibleNavigationLinks({
      isSignedIn: true,
      appLinks: appNavigationLinks,
      authLinks: authNavigationLinks,
    });

    expect(links.map((link) => link.href)).toEqual([
      "/analyze",
      "/account",
      "/system",
    ]);
  });
});