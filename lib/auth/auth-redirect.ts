export const allowedAuthRedirectPaths = [
  "/account",
  "/analyze",
  "/analyze/manual",
] as const;

export const defaultAuthRedirectPath = "/account";

export const isSafeAuthRedirectPath = (path: string) => {
  if (!path.startsWith("/")) {
    return false;
  }

  if (path.startsWith("//")) {
    return false;
  }

  return allowedAuthRedirectPaths.some((allowedPath) => path === allowedPath);
};

export const getSafeAuthRedirectPath = (path: string | null) => {
  if (!path) {
    return defaultAuthRedirectPath;
  }

  if (!isSafeAuthRedirectPath(path)) {
    return defaultAuthRedirectPath;
  }

  return path;
};

export const buildAuthCallbackUrl = ({
  origin,
  nextPath = defaultAuthRedirectPath,
}: {
  origin: string;
  nextPath?: string;
}) => {
  const safeNextPath = getSafeAuthRedirectPath(nextPath);
  const callbackUrl = new URL("/auth/callback", origin);

  callbackUrl.searchParams.set("next", safeNextPath);

  return callbackUrl.toString();
};