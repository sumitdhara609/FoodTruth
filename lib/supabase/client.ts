import { createBrowserClient } from "@supabase/ssr";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase/env";

export const createSupabaseBrowserClient = () => {
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabasePublishableKey()
  );
};