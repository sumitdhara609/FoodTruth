import { describe, expect, it } from "vitest";
import { getDeploymentHealthSnapshot } from "@/lib/deployment/deployment-health";

describe("deployment health", () => {
  it("marks deployment ready when all required environment variables exist", () => {
    const snapshot = getDeploymentHealthSnapshot({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
      NEXT_PUBLIC_SITE_URL: "https://foodtruth.example.com",
    });

    expect(snapshot.ready).toBe(true);
    expect(snapshot.configuredCount).toBe(3);
    expect(snapshot.totalCount).toBe(3);
  });

  it("marks deployment not ready when a required environment variable is missing", () => {
    const snapshot = getDeploymentHealthSnapshot({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
      NEXT_PUBLIC_SITE_URL: "https://foodtruth.example.com",
    });

    expect(snapshot.ready).toBe(false);
    expect(snapshot.configuredCount).toBe(2);
    expect(snapshot.totalCount).toBe(3);
  });

  it("never exposes environment variable values in snapshot items", () => {
    const snapshot = getDeploymentHealthSnapshot({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
      NEXT_PUBLIC_SITE_URL: "https://foodtruth.example.com",
    });

    expect(snapshot.items).toEqual([
      {
        key: "NEXT_PUBLIC_SUPABASE_URL",
        configured: true,
      },
      {
        key: "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
        configured: true,
      },
      {
        key: "NEXT_PUBLIC_SITE_URL",
        configured: true,
      },
    ]);
  });
});