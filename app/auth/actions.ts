"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  buildAuthCallbackUrl,
  defaultAuthRedirectPath,
} from "@/lib/auth/auth-redirect";
import { normalizeDisplayName } from "@/lib/auth/name-validation";
import { validateAuthCredentials } from "@/lib/auth/auth-validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const getFormValue = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value;
};

const buildAuthRedirect = (path: string, message: string) => {
  return `${path}?message=${encodeURIComponent(message)}`;
};

const getRequestOrigin = async () => {
  const headerStore = await headers();

  return (
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
};

export async function signUpAction(formData: FormData) {
  const name = normalizeDisplayName(getFormValue(formData, "name"));

  if (!name) {
    redirect(buildAuthRedirect("/auth/sign-up", "Name is required."));
  }

  const validation = validateAuthCredentials(
    getFormValue(formData, "email"),
    getFormValue(formData, "password")
  );

  if (!validation.success) {
    redirect(buildAuthRedirect("/auth/sign-up", validation.message));
  }

  const origin = await getRequestOrigin();
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email: validation.email,
    password: validation.password,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo: buildAuthCallbackUrl({
        origin,
        nextPath: defaultAuthRedirectPath,
      }),
    },
  });

  if (error) {
    redirect(buildAuthRedirect("/auth/sign-up", error.message));
  }

  redirect(
    buildAuthRedirect(
      "/auth/sign-in",
      "Account created. Please confirm your email before signing in."
    )
  );
}

export async function signInAction(formData: FormData) {
  const validation = validateAuthCredentials(
    getFormValue(formData, "email"),
    getFormValue(formData, "password")
  );

  if (!validation.success) {
    redirect(buildAuthRedirect("/auth/sign-in", validation.message));
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validation.email,
    password: validation.password,
  });

  if (error) {
    redirect(buildAuthRedirect("/auth/sign-in", error.message));
  }

  redirect("/account");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.signOut();

  redirect("/auth/sign-in?message=You have been signed out.");
}