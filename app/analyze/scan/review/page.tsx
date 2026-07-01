import Link from "next/link";
import { AnalyzerPageShell } from "@/components/analyze/analyzer-page-shell";
import {
  scanReviewWorkspaceCopy,
  scanReviewWorkspacePolicy,
} from "@/lib/analyze/scan-review-workspace";
import { getReviewRoute } from "@/lib/analyze/review-route-contract";

export default function ScanReviewPage() {
  const uploadReviewRoute = getReviewRoute("upload");

  return (
    <AnalyzerPageShell>
      <section>
        <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
          {scanReviewWorkspaceCopy.eyebrow}
        </p>

        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
          {scanReviewWorkspaceCopy.title}
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
          {scanReviewWorkspaceCopy.description}
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Capture Status
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
            Camera capture is not active yet.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/55">
            {scanReviewWorkspaceCopy.unavailable}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={uploadReviewRoute.href}
              className="inline-flex justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-xs font-semibold text-[var(--background)] transition hover:opacity-90"
            >
              Open upload review
            </Link>

            <Link
              href="/analyze/scan"
              className="inline-flex justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-semibold text-[var(--foreground)]/60 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            >
              Back to scan
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Review Boundary
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
            No direct scan-to-report.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/55">
            {scanReviewWorkspaceCopy.boundary}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ScanReviewPolicyCard
              label="Camera active"
              value={
                scanReviewWorkspacePolicy.cameraCaptureActive ? "Yes" : "No"
              }
            />
            <ScanReviewPolicyCard
              label="Image stored"
              value={scanReviewWorkspacePolicy.storesCameraImage ? "Yes" : "No"}
            />
            <ScanReviewPolicyCard
              label="Draft required"
              value={
                scanReviewWorkspacePolicy.usesExtractionDraft ? "Yes" : "No"
              }
            />
            <ScanReviewPolicyCard
              label="Review required"
              value={scanReviewWorkspacePolicy.requiresUserReview ? "Yes" : "No"}
            />
          </div>
        </div>
      </section>
    </AnalyzerPageShell>
  );
}

function ScanReviewPolicyCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.3rem] border border-[var(--border)] bg-[var(--background)]/65 p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--foreground)]/38">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]/72">
        {value}
      </p>
    </div>
  );
}