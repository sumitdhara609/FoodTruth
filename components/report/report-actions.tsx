"use client";

import { useState } from "react";
import { ReportActionBar } from "@/components/report/report-action-bar";
import type { FoodTruthReport } from "@/lib/engine/types";
import { formatFoodTruthReportForCopy } from "@/lib/report/report-copy";

type ReportActionsProps = {
  report: FoodTruthReport;
  isSaving: boolean;
  saveMessage: string | null;
  onSave: () => void;
  onReset: () => void;
};

export function ReportActions({
  report,
  isSaving,
  saveMessage,
  onSave,
  onReset,
}: ReportActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyReport = async () => {
    const copyText = formatFoodTruthReportForCopy(report);

    await navigator.clipboard.writeText(copyText);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <ReportActionBar
      copied={copied}
      isSaving={isSaving}
      saveMessage={saveMessage}
      onCopy={handleCopyReport}
      onSave={onSave}
      onReset={onReset}
    />
  );
}