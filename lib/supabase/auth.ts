import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getCurrentUser = async () => {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
};