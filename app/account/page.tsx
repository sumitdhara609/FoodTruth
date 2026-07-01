import { redirect } from "next/navigation";
import { AccountDashboardPlaceholder } from "@/components/account/account-dashboard-placeholder";
import { AccountPageHeader } from "@/components/account/account-page-header";
import { AccountSignalCard } from "@/components/account/account-signal-card";
import { BadgeProgressPreview } from "@/components/account/badge-progress-preview";
import { AccountReportArchive } from "@/components/account/account-report-archive";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { accountSignals } from "@/lib/account/account-signal";
import { getSavedReportsForUser } from "@/lib/database/saved-report-query-service";
import { getCurrentUser } from "@/lib/supabase/auth";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in?message=Please sign in to view your account.");
  }

  const savedReportsResult = await getSavedReportsForUser(user.id);
  const savedReports = savedReportsResult.reports;

  return (
    <AnalyzerPageShell>
      <AccountPageHeader />

      {!savedReportsResult.success && (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 px-5 py-4">
          <p className="text-sm leading-6 text-[var(--foreground)]/62">
            {savedReportsResult.message}
          </p>
        </div>
      )}

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

      <BadgeProgressPreview savedReportCount={savedReports.length} />

      <AccountReportArchive reports={savedReports} />

      <AccountDashboardPlaceholder />
    </AnalyzerPageShell>
  );
}