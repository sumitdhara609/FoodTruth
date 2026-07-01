import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SavedReportDetail } from "@/components/account/saved-report-detail";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { getSavedReportDetailForUser } from "@/lib/database/saved-report-detail-service";
import { getCurrentUser } from "@/lib/supabase/auth";

type SavedReportDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SavedReportDetailPage({
  params,
}: SavedReportDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in?message=Please sign in to view saved reports.");
  }

  const { id } = await params;

  const result = await getSavedReportDetailForUser({
    reportId: id,
    userId: user.id,
  });

  if (!result.success) {
    throw new Error(result.message);
  }

  if (!result.report) {
    notFound();
  }

  return (
    <AnalyzerPageShell>
      <section>
        <Link
          href="/account"
          className="text-xs font-semibold text-[var(--foreground)]/48 transition hover:text-[var(--foreground)]"
        >
          ← Back to account
        </Link>

        <p className="mt-8 text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Report Detail
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Review the full saved label report.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          This page shows the saved report signals generated from reviewed label
          data. It does not store original label images.
        </p>
      </section>

      <SavedReportDetail report={result.report} />
    </AnalyzerPageShell>
  );
}