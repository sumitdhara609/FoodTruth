import { redirect } from "next/navigation";
import { AccountReportArchive } from "@/components/account/account-report-archive";
import { AccountReportStats } from "@/components/account/account-report-stats";
import { AccountSessionCard } from "@/components/account/account-session-card";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { getAccountFirstName } from "@/lib/account/account-identity";
import { calculateAccountReportStats } from "@/lib/account/account-report-stats";
import { getProfileForUser } from "@/lib/database/profile-query-service";
import { getSavedReportsForUser } from "@/lib/database/saved-report-query-service";
import { getCurrentUser } from "@/lib/supabase/auth";

type AccountPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in?message=Please sign in to view your account.");
  }

  const [query, profileResult, savedReportsResult] = await Promise.all([
    searchParams,
    getProfileForUser(user.id),
    getSavedReportsForUser(user.id),
  ]);

  const profile = profileResult.success ? profileResult.profile : null;
  const firstName = getAccountFirstName({ profile, user });
  const reports = savedReportsResult.success ? savedReportsResult.reports : [];
  const stats = calculateAccountReportStats(reports);

  return (
    <AnalyzerPageShell>
      <section>
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Account
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Welcome back, {firstName}.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          Your saved FoodTruth reports, account session, and label history live
          here.
        </p>
      </section>

      {query.message && (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-4 text-sm leading-6 text-[var(--foreground)]/55">
          {query.message}
        </div>
      )}

      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <AccountReportStats stats={stats} />
        <AccountSessionCard email={user.email} />
      </div>

      {!profileResult.success && (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-4 text-sm leading-6 text-[var(--foreground)]/55">
          Profile could not be loaded: {profileResult.message}
        </div>
      )}

      {!savedReportsResult.success && (
        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-4 text-sm leading-6 text-[var(--foreground)]/55">
          Saved reports could not be loaded: {savedReportsResult.message}
        </div>
      )}

      <AccountReportArchive reports={reports} />
    </AnalyzerPageShell>
  );
}