import { ShieldCheck, Trophy, History } from "lucide-react";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { BadgeProgressPreview } from "@/components/account/badge-progress-preview";

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

<BadgeProgressPreview savedReportCount={25} />

export default function AccountPage() {
  return (
    <AnalyzerPageShell>
      <section className="pt-8">
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          FoodTruth Account
        </p>

        <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
              Your label intelligence archive.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
              This space will hold saved FoodTruth reports, badge progress, and
              personal label history after authentication is connected.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
              Account phase
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
              The account foundation is being prepared before Supabase auth and
              database tables are connected.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {accountSignals.map((signal) => {
          const Icon = signal.icon;

          return (
            <div
              key={signal.title}
              className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
                <Icon className="h-5 w-5" />
              </div>

              <h2 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {signal.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/56">
                {signal.description}
              </p>
            </div>
          );
        })}
      </section>

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