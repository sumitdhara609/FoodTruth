import { deleteSavedReportAction } from "@/app/account/reports/[id]/actions";

type DeleteSavedReportButtonProps = {
  reportId: string;
};

export function DeleteSavedReportButton({
  reportId,
}: DeleteSavedReportButtonProps) {
  const deleteAction = deleteSavedReportAction.bind(null, reportId);

  return (
    <form action={deleteAction}>
      <button
        type="submit"
        className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]/48 transition hover:bg-[var(--surface-muted)] hover:text-[var(--warning)]"
      >
        Delete report
      </button>
    </form>
  );
}