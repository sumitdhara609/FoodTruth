import { describe, expect, it } from "vitest";
import type { User } from "@supabase/supabase-js";
import type { AccountProfile } from "@/lib/account/account-profile";
import {
  getAccountDisplayName,
  getAccountFirstName,
  getUserMetadataFullName,
} from "@/lib/account/account-identity";

const createUser = (fullName: string | null): User =>
  ({
    id: "user-1",
    email: "sumit@example.com",
    user_metadata: fullName ? { full_name: fullName } : {},
  }) as User;

const createProfile = (fullName: string | null): AccountProfile => ({
  id: "user-1",
  email: "sumit@example.com",
  fullName,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
});

describe("account identity", () => {
  it("reads full name from user metadata", () => {
    expect(getUserMetadataFullName(createUser("Sumit Dhara"))).toBe(
      "Sumit Dhara"
    );
  });

  it("prefers profile full name over auth metadata", () => {
    const user = createUser("Auth Name");
    const profile = createProfile("Profile Name");

    expect(getAccountDisplayName({ profile, user })).toBe("Profile Name");
  });

  it("returns first name for dashboard greeting", () => {
    const user = createUser("Sumit Dhara");

    expect(getAccountFirstName({ profile: null, user })).toBe("Sumit");
  });

  it("falls back cleanly when no name exists", () => {
    const user = createUser(null);

    expect(getAccountFirstName({ profile: null, user })).toBe("");
  });
});