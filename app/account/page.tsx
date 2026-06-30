import { History, ShieldCheck, Trophy } from "lucide-react";
import { AccountPageHeader } from "@/components/account/account-page-header";
import { AccountSignalCard } from "@/components/account/account-signal-card";
import { BadgeProgressPreview } from "@/components/account/badge-progress-preview";
import { SavedReportHistoryPreview } from "@/components/account/saved-report-history-preview";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { sampleSavedReports } from "@/lib/account/sample-saved-reports";

const accountSignals = [
  {
    title: "Saved label records",
    description:
      "A private archive of reviewed label data will appear here after sign-in is connected.",
    icon: History,
  },
  {
    title: "Badge progress",
    description:
      "Conscious label-checking milestones will be calculated from saved reports.",
    icon: Trophy,
  },
  {
    title: "Data-light records",
    description:
      "Records will store reviewed label data only, not uploaded image files or image metadata.",
    icon: ShieldCheck,
  },
];

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

      <section className="mt-10 rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)]/55 p-8 text-center">
        <p className="text-sm font-medium text-[var(--foreground)]/70">
          Account dashboard placeholder
        </p>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--foreground)]/50">
          Supabase authentication and saved report history will be connected
          after the local account model remains stable.
        </p>
      </section>
    </AnalyzerPageShell>
  );
}