import { NextResponse, type NextRequest } from "next/server";
import { authCallbackConfig } from "@/lib/auth/auth-callback-config";
import { getSafeAuthRedirectPath } from "@/lib/auth/auth-redirect";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get(authCallbackConfig.codeParam);
  const next = getSafeAuthRedirectPath(
    requestUrl.searchParams.get(authCallbackConfig.nextParam)
  );

  if (code) {
    const supabase = await createSupabaseServerClient();

    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}