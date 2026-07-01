import Link from "next/link";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { SystemStatusPanel } from "@/components/system/system-status-panel";

export default function SystemPage() {
  return (
    <AnalyzerPageShell>
      <section>
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Internal Readiness
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Track the product foundation before deployment.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          This page keeps FoodTruth’s current build status visible while auth,
          database, deployment, upload, and scan workflows mature.
        </p>

        <div className="mt-7">
          <Link
            href="/system/deployment"
            className="inline-flex rounded-full bg-[var(--primary)] px-5 py-3 text-xs font-semibold text-[var(--background)] transition hover:opacity-90"
          >
            View deployment health
          </Link>
        </div>
      </section>

      <SystemStatusPanel />
    </AnalyzerPageShell>
  );
}