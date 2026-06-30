import { AccountDashboardPlaceholder } from "@/components/account/account-dashboard-placeholder";
import { AccountPageHeader } from "@/components/account/account-page-header";
import { AccountSignalCard } from "@/components/account/account-signal-card";
import { BadgeProgressPreview } from "@/components/account/badge-progress-preview";
import { SavedReportHistoryPreview } from "@/components/account/saved-report-history-preview";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { accountSignals } from "@/lib/account/account-signal";
import { sampleSavedReports } from "@/lib/account/sample-saved-reports";

export default function AccountPage() {
  return (
    <AnalyzerPageShell>
      <AccountPageHeader />

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {accountSignals.map((signal) => (
          <AccountSignalCard
            key={signal.title}
            title={signal.title}
            description={signal.description}
            icon={signal.icon}
          />
        ))}
      </section>

      <BadgeProgressPreview savedReportCount={25} />

      <SavedReportHistoryPreview reports={sampleSavedReports} />

      <AccountDashboardPlaceholder />
    </AnalyzerPageShell>
  );
}