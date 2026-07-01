import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DeleteSavedReportResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export const deleteSavedReportForUser = async ({
  reportId,
  userId,
}: {
  reportId: string;
  userId: string;
}): Promise<DeleteSavedReportResult> => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("saved_label_reports")
    .delete()
    .eq("id", reportId)
    .eq("user_id", userId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
  };
};