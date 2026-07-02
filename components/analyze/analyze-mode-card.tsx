import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AnalyzerMode } from "@/lib/analyze/analyzer-mode";

type AnalyzeModeCardProps = {
  mode: AnalyzerMode;
};

export function AnalyzeModeCard({ mode }: AnalyzeModeCardProps) {
  const Icon = mode.icon;

  return (
    <Link href={mode.href} className="block h-full">
      <div className="group flex h-full flex-col justify-between rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:bg-[var(--surface)]">
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
              <Icon className="h-5 w-5" />
            </div>

            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/45">
              {mode.status}
            </span>
          </div>

          <h2 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            {mode.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/56">
            {mode.description}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm font-medium text-[var(--primary)]">
          <span>{mode.actionLabel}</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}