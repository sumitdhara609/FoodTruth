import { afterEach, describe, expect, it } from "vitest";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";

const originalEnv = process.env;

describe("Supabase environment helpers", () => {
  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns configured Supabase environment values", () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
    };

    expect(getSupabaseUrl()).toBe("https://example.supabase.co");
    expect(getSupabasePublishableKey()).toBe("sb_publishable_example");
  });

  it("throws when Supabase URL is missing", () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
    };

    expect(() => getSupabaseUrl()).toThrow("Missing NEXT_PUBLIC_SUPABASE_URL");
  });

  it("throws when Supabase publishable key is missing", () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
    };

    expect(() => getSupabasePublishableKey()).toThrow(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
  });
});