import Link from "next/link";
import { FileText } from "lucide-react";

export function AccountEmptyState() {
  return (
    <section className="mt-10 rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)]/60 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
        <FileText className="h-6 w-6" />
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
        No saved reports yet
      </p>

      <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
        Start building your personal label archive.
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/55">
        Analyze a packaged-food label and save the report to begin tracking
        your label-reading history, account signals, and badge progress.
      </p>

      <Link
        href="/analyze/manual"
        className="mt-6 inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_18px_45px_rgba(22,63,47,0.18)] transition hover:opacity-90"
      >
        Analyze a label
      </Link>
    </section>
  );
}