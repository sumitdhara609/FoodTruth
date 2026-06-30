"use client";

import { useState } from "react";
import { Check, Copy, GitCompareArrows, Save } from "lucide-react";
import type { FoodTruthReport } from "@/lib/engine/types";

type ReportActionsProps = {
  report: FoodTruthReport;
};

export function ReportActions({ report }: ReportActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const summary = [
      `FoodTruth Report: ${report.productName}`,
      `Score: ${report.score}/100`,
      `Grade: ${report.grade}`,
      `Risk level: ${report.riskLevel}`,
      `Summary: ${report.summary}`,
    ].join("\n");

    await navigator.clipboard.writeText(summary);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <button
        type="button"
        onClick={handleCopySummary}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-3 text-xs font-semibold text-[var(--background)] transition hover:opacity-90"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy summary"}
      </button>

      <button
        type="button"
        disabled
        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs font-semibold text-[var(--foreground)]/35"
      >
        <Save className="h-4 w-4" />
        Save report
      </button>

      <button
        type="button"
        disabled
        className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs font-semibold text-[var(--foreground)]/35"
      >
        <GitCompareArrows className="h-4 w-4" />
        Compare later
      </button>
    </div>
  );
}