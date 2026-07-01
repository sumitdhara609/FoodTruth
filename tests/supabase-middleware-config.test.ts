import { describe, expect, it } from "vitest";
import { supabaseMiddlewareMatcher } from "@/lib/supabase/middleware-config";

describe("Supabase middleware config", () => {
  it("keeps middleware matcher configured for app routes", () => {
    expect(supabaseMiddlewareMatcher).toContain("_next/static");
    expect(supabaseMiddlewareMatcher).toContain("_next/image");
    expect(supabaseMiddlewareMatcher).toContain("favicon.ico");
  });

  it("keeps matcher as an absolute route pattern", () => {
    expect(supabaseMiddlewareMatcher.startsWith("/")).toBe(true);
  });
});