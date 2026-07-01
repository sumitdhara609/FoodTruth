import type { User } from "@supabase/supabase-js";
import type { AccountProfile } from "@/lib/account/account-profile";
import { getFirstName } from "@/lib/auth/name-validation";

export const getUserMetadataFullName = (user: User) => {
  const fullName = user.user_metadata?.full_name;

  if (typeof fullName !== "string") {
    return null;
  }

  return fullName;
};

export const getAccountDisplayName = ({
  profile,
  user,
}: {
  profile: AccountProfile | null;
  user: User;
}) => {
  return profile?.fullName ?? getUserMetadataFullName(user) ?? null;
};

export const getAccountFirstName = ({
  profile,
  user,
}: {
  profile: AccountProfile | null;
  user: User;
}) => {
  return getFirstName(getAccountDisplayName({ profile, user }));
};