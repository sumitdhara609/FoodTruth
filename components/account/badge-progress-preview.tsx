import { Trophy } from "lucide-react";
import {
  getBadgeProgress,
  getEarnedBadges,
} from "@/lib/account/badge-system";

type BadgeProgressPreviewProps = {
  savedReportCount: number;
};

export function BadgeProgressPreview({
  savedReportCount,
}: BadgeProgressPreviewProps) {
  const earnedBadges = getEarnedBadges(savedReportCount);
  const progress = getBadgeProgress(savedReportCount);

  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Badge Progress
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            Label awareness milestones.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/56">
            Badges will be earned from saved label records once account history
            is connected.
          </p>
        </div>

        <div className="rounded-[1.5rem] bg-[var(--accent-muted)] px-5 py-4 text-[var(--primary)]">
          <p className="text-3xl font-semibold tracking-[-0.06em]">
            {savedReportCount}
          </p>
          <p className="mt-1 text-xs font-medium">saved records</p>
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4">
        {progress.nextBadge ? (
          <>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/35">
                  Next badge
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]/78">
                  {progress.nextBadge.name}
                </p>
              </div>

              <p className="text-xs font-medium text-[var(--foreground)]/50">
                {progress.remainingRecords} records left
              </p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]">
              <div
                className="h-full rounded-full bg-[var(--primary)]"
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
          </>
        ) : (
          <p className="text-sm leading-7 text-[var(--foreground)]/62">
            All current badge milestones have been reached.
          </p>
        )}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {earnedBadges.length > 0 ? (
          earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
                <Trophy className="h-4 w-4" />
              </div>

              <p className="mt-4 text-sm font-semibold text-[var(--foreground)]/78">
                {badge.name}
              </p>

              <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/52">
                {badge.description}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4 md:col-span-3">
            <p className="text-sm font-medium text-[var(--foreground)]/70">
              No badges earned yet.
            </p>

            <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/52">
              The first badge begins after 10 saved label records.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}