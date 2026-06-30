export type AuthValidationResult =
  | {
      success: true;
      email: string;
      password: string;
    }
  | {
      success: false;
      message: string;
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateAuthCredentials = (
  emailInput: string,
  passwordInput: string
): AuthValidationResult => {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  if (!emailPattern.test(email)) {
    return {
      success: false,
      message: "Enter a valid email address.",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters.",
    };
  }

  return {
    success: true,
    email,
    password,
  };
};