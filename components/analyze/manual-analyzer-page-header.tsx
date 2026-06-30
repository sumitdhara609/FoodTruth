import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { manualAnalyzerPageConfig } from "@/lib/analyze/manual-analyzer-page-config";

export function ManualAnalyzerPageHeader() {
  return (
    <header>
      <Link
        href={manualAnalyzerPageConfig.backHref}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)]/62 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        {manualAnalyzerPageConfig.backLabel}
      </Link>

      <div className="mt-10">
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          {manualAnalyzerPageConfig.eyebrow}
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          {manualAnalyzerPageConfig.title}
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          {manualAnalyzerPageConfig.description}
        </p>
      </div>
    </header>
  );
}