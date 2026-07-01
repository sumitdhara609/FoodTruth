import Link from "next/link";
import {
  scanWorkspaceCopy,
  scanWorkspacePolicy,
  scanWorkspaceSteps,
} from "@/lib/analyze/scan-workspace";
import { getReviewRoute } from "@/lib/analyze/review-route-contract";

export function ScanWorkspace() {
  const uploadReviewRoute = getReviewRoute("upload");
  const scanReviewRoute = getReviewRoute("scan");

  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          {scanWorkspaceCopy.eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          {scanWorkspaceCopy.title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/55">
          {scanWorkspaceCopy.description}
        </p>

        <div className="mt-6 rounded-[1.75rem] border border-dashed border-[var(--border)] bg-[var(--background)]/70 p-8 text-center">
          <p className="text-sm font-semibold text-[var(--foreground)]/72">
            Camera capture is being prepared.
          </p>

          <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-[var(--foreground)]/45">
            {scanWorkspaceCopy.unavailable}
          </p>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]/70">
            Scan Privacy Rule
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
            Camera images are temporary inputs. FoodTruth does not store camera
            images, file names, or file sizes. Only reviewed label data and
            generated report signals may be saved.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={uploadReviewRoute.href}
            className="inline-flex justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-xs font-semibold text-[var(--background)] transition hover:opacity-90"
          >
            Open upload review
          </Link>

          <Link
            href={scanReviewRoute.href}
            className="inline-flex justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-semibold text-[var(--foreground)]/60 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            Prepare scan review
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          Shared Pipeline
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          Scan uses the same review layer.
        </h2>

        <div className="mt-6 grid gap-3">
          {scanWorkspaceSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/65 p-4"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-muted)] text-xs font-semibold text-[var(--primary)]">
                  {index + 1}
                </span>

                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]/78">
                    {step.title}
                  </p>

                  <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/50">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--accent-muted)]/70 p-4">
          <p className="text-sm leading-7 text-[var(--primary)]">
            Direct scan-to-report is intentionally disabled. Every extracted
            value must pass through review before analysis.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ScanPolicyCard
            label="Image stored"
            value={scanWorkspacePolicy.storesCameraImage ? "Yes" : "No"}
          />

          <ScanPolicyCard
            label="Direct to report"
            value={scanWorkspacePolicy.directScanToReport ? "Yes" : "No"}
          />

          <ScanPolicyCard
            label="Review required"
            value={
              scanWorkspacePolicy.requiresUserReviewBeforeReport ? "Yes" : "No"
            }
          />

          <ScanPolicyCard
            label="Saved data"
            value={
              scanWorkspacePolicy.savesOnlyReviewedLabelData
                ? "Reviewed only"
                : "Unrestricted"
            }
          />
        </div>
      </div>
    </section>
  );
}

function ScanPolicyCard({ label, value }: { label: string; value: string }) {
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