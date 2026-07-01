import type { NextRequest } from "next/server";
import { supabaseMiddlewareMatcher } from "@/lib/supabase/middleware-config";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: [supabaseMiddlewareMatcher],
};