import Link from "next/link";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import { DeploymentHealthPanel } from "@/components/system/deployment-health-panel";

export default function DeploymentSystemPage() {
  return (
    <AnalyzerPageShell>
      <section>
        <Link
          href="/system"
          className="text-xs font-semibold text-[var(--foreground)]/48 transition hover:text-[var(--foreground)]"
        >
          ← Back to system status
        </Link>

        <p className="mt-8 text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          Deployment Snapshot
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          Check the runtime foundation before release.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          FoodTruth should only be deployed when the required Supabase and site
          environment variables are configured in the target runtime.
        </p>
      </section>

      <DeploymentHealthPanel />
    </AnalyzerPageShell>
  );
}