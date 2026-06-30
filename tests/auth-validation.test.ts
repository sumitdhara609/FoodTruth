import { describe, expect, it } from "vitest";
import { validateAuthCredentials } from "@/lib/auth/auth-validation";

describe("auth validation", () => {
  it("accepts valid email and password credentials", () => {
    const result = validateAuthCredentials(
      "  USER@example.com  ",
      "password123"
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.email).toBe("user@example.com");
      expect(result.password).toBe("password123");
    }
  });

  it("rejects missing email or password", () => {
    expect(validateAuthCredentials("", "password123")).toEqual({
      success: false,
      message: "Email and password are required.",
    });

    expect(validateAuthCredentials("user@example.com", "")).toEqual({
      success: false,
      message: "Email and password are required.",
    });
  });

  it("rejects invalid email format", () => {
    expect(validateAuthCredentials("fake-email", "password123")).toEqual({
      success: false,
      message: "Enter a valid email address.",
    });

    expect(validateAuthCredentials("test@", "password123")).toEqual({
      success: false,
      message: "Enter a valid email address.",
    });
  });

  it("rejects short passwords", () => {
    expect(validateAuthCredentials("user@example.com", "short")).toEqual({
      success: false,
      message: "Password must be at least 8 characters.",
    });
  });
});