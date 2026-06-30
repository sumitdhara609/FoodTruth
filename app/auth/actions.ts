"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const getFormValue = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const buildAuthRedirect = (path: string, message: string) => {
  return `${path}?message=${encodeURIComponent(message)}`;
};

export async function signUpAction(formData: FormData) {
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  if (!email || !password) {
    redirect(buildAuthRedirect("/auth/sign-up", "Email and password are required."));
  }

  if (password.length < 8) {
    redirect(
      buildAuthRedirect(
        "/auth/sign-up",
        "Password must be at least 8 characters."
      )
    );
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(buildAuthRedirect("/auth/sign-up", error.message));
  }

  redirect(
    buildAuthRedirect(
      "/auth/sign-in",
      "Account created. Check your email if confirmation is required, then sign in."
    )
  );
}

export async function signInAction(formData: FormData) {
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  if (!email || !password) {
    redirect(buildAuthRedirect("/auth/sign-in", "Email and password are required."));
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(buildAuthRedirect("/auth/sign-in", error.message));
  }

  redirect("/account");
}