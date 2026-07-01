import Link from "next/link";
import {
  uploadReviewDraftMessages,
  uploadReviewDraftSteps,
} from "@/lib/analyze/upload-review-draft-workspace";

export function UploadReviewDraftPanel() {
  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          Review Draft
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          Prepare the label before analysis.
        </h2>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/55">
          {uploadReviewDraftMessages.noAutomaticExtraction}
        </p>

        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]/70">
            Privacy Boundary
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
            {uploadReviewDraftMessages.privacy}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/analyze/manual"
            className="inline-flex justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-xs font-semibold text-[var(--background)] transition hover:opacity-90"
          >
            Continue to manual review
          </Link>

          <Link
            href="/analyze/upload"
            className="inline-flex justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-semibold text-[var(--foreground)]/60 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            Back to upload
          </Link>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          Review Path
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          From image to reviewed data.
        </h2>

        <div className="mt-6 grid gap-3">
          {uploadReviewDraftSteps.map((step, index) => (
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
            {uploadReviewDraftMessages.nextStep}
          </p>
        </div>
      </div>
    </section>
  );
}