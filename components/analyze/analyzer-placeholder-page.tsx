import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";

type AnalyzerPlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  workflowTitle: string;
  workflowDescription: string;
  placeholderTitle: string;
  placeholderDescription: string;
  icon: LucideIcon;
  children?: ReactNode;
};

export function AnalyzerPlaceholderPage({
  eyebrow,
  title,
  description,
  workflowTitle,
  workflowDescription,
  placeholderTitle,
  placeholderDescription,
  icon: Icon,
  children,
}: AnalyzerPlaceholderPageProps) {
  return (
    <AnalyzerPageShell>
      <Link
        href="/analyze"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)]/62 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to analyze
      </Link>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_0.55fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
            {eyebrow}
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
            {description}
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
            <Icon className="h-5 w-5" />
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
            {workflowTitle}
          </p>

          <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
            {workflowDescription}
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)]/55 p-8 text-center">
        <p className="text-sm font-medium text-[var(--foreground)]/70">
          {placeholderTitle}
        </p>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--foreground)]/50">
          {placeholderDescription}
        </p>
      </section>

      {children}
    </AnalyzerPageShell>
  );
}