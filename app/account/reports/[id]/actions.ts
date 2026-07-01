"use server";

import { redirect } from "next/navigation";
import { deleteSavedReportForUser } from "@/lib/database/saved-report-delete-service";
import { getCurrentUser } from "@/lib/supabase/auth";

export async function deleteSavedReportAction(reportId: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in?message=Please sign in to manage saved reports.");
  }

  const result = await deleteSavedReportForUser({
    reportId,
    userId: user.id,
  });

  if (!result.success) {
    redirect(
      `/account/reports/${reportId}?message=${encodeURIComponent(
        result.message
      )}`
    );
  }

  redirect("/account?message=Saved report deleted.");
}