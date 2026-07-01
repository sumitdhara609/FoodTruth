import type {
  appNavigationLinks,
  authNavigationLinks,
} from "@/lib/navigation/app-navigation";

type NavigationLink =
  | (typeof appNavigationLinks)[number]
  | (typeof authNavigationLinks)[number];

export const getVisibleNavigationLinks = ({
  isSignedIn,
  appLinks,
  authLinks,
}: {
  isSignedIn: boolean;
  appLinks: readonly NavigationLink[];
  authLinks: readonly NavigationLink[];
}) => {
  const visibleAppLinks = isSignedIn
    ? appLinks
    : appLinks.filter((link) => link.href !== "/account");

  return isSignedIn ? visibleAppLinks : [...visibleAppLinks, ...authLinks];
};