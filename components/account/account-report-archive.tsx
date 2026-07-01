import { AccountEmptyState } from "@/components/account/account-empty-state";
import { SavedReportHistoryPreview } from "@/components/account/saved-report-history-preview";
import type { SavedLabelReport } from "@/lib/account/saved-label-report";

type AccountReportArchiveProps = {
  reports: SavedLabelReport[];
};

export function AccountReportArchive({ reports }: AccountReportArchiveProps) {
  if (reports.length === 0) {
    return <AccountEmptyState />;
  }

  return <SavedReportHistoryPreview reports={reports} />;
}