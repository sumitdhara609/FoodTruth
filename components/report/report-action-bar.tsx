"use client";

import { ReportActionButton } from "@/components/report/report-action-button";
import {
  getPlannedReportActions,
  getReadyReportActions,
} from "@/lib/report/report-action-config";

type ReportActionBarProps = {
  copied: boolean;
  onCopy: () => void;
  onReset: () => void;
};

export function ReportActionBar({
  copied,
  onCopy,
  onReset,
}: ReportActionBarProps) {
  const readyActions = getReadyReportActions();
  const plannedActions = getPlannedReportActions();

  return (
    <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]/70">
            Report Actions
          </p>

          <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/52">
            Copy, reset, and prepare this report for future account-based
            saving.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {readyActions.map((action) => {
            if (action.key === "copy") {
              return (
                <ReportActionButton key={action.key} onClick={onCopy}>
                  {copied ? "Copied" : action.label}
                </ReportActionButton>
              );
            }

            if (action.key === "reset") {
              return (
                <ReportActionButton key={action.key} onClick={onReset}>
                  {action.label}
                </ReportActionButton>
              );
            }

            return null;
          })}

          {plannedActions.map((action) => (
            <ReportActionButton key={action.key} disabled>
              {action.label}
            </ReportActionButton>
          ))}
        </div>
      </div>
    </div>
  );
}