import { describe, expect, it } from "vitest";
import {
  getAccountDisplayName,
  getAccountFirstName,
  getUserMetadataFullName,
} from "@/lib/account/account-identity";

const createUser = (fullName: unknown) => {
  return {
    id: "user_123",
    app_metadata: {},
    aud: "authenticated",
    created_at: "2026-01-01T00:00:00.000Z",
    user_metadata: {
      full_name: fullName,
    },
  };
};

describe("account identity", () => {
  it("reads full name from user metadata", () => {
    const user = createUser("Sumit Dhara");

    expect(getUserMetadataFullName(user)).toBe("Sumit Dhara");
  });

  it("prefers profile full name over auth metadata", () => {
    const user = createUser("Metadata Name");

    const profile = {
      id: "user_123",
      email: "sumit@example.com",
      fullName: "Profile Name",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    };

    expect(getAccountDisplayName({ profile, user })).toBe("Profile Name");
  });

  it("returns first name for dashboard greeting", () => {
    const user = createUser("Sumit Dhara");

    expect(getAccountFirstName({ profile: null, user })).toBe("Sumit");
  });

  it("falls back politely when no name exists", () => {
    const user = createUser(null);

    expect(getAccountFirstName({ profile: null, user })).toBe("there");
  });
});