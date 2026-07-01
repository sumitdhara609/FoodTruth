import type { AccountProfile } from "@/lib/account/account-profile";
import type { ProfileRow } from "@/lib/database/profile-row";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProfileQueryResult =
  | {
      success: true;
      profile: AccountProfile | null;
    }
  | {
      success: false;
      message: string;
      profile: null;
    };

export const mapProfileRowToAccountProfile = (
  row: ProfileRow
): AccountProfile => {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};

export const getProfileForUser = async (
  userId: string
): Promise<ProfileQueryResult> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,created_at,updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      message: error.message,
      profile: null,
    };
  }

  if (!data) {
    return {
      success: true,
      profile: null,
    };
  }

  const row = data as unknown as ProfileRow;

  return {
    success: true,
    profile: mapProfileRowToAccountProfile(row),
  };
};