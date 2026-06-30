import { FileCheck2, ShieldCheck, UploadCloud } from "lucide-react";
import { MAX_LABEL_UPLOAD_SIZE_MB } from "@/lib/account/report-storage-policy";

const uploadSteps = [
  {
    title: "Temporary upload",
    description:
      "The label image will be used only for extraction and review, not saved as a record.",
    icon: UploadCloud,
  },
  {
    title: "Review before report",
    description:
      "Extracted values will be shown for correction before FoodTruth generates a report.",
    icon: FileCheck2,
  },
  {
    title: "Data-light history",
    description:
      "Saved records will keep reviewed label data and report signals, not file names or image metadata.",
    icon: ShieldCheck,
  },
];

export function UploadReviewPlaceholder() {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Upload Review Flow
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            Image input will become a reviewable label draft.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/56">
            Upload will accept JPG, PNG, or WEBP label images up to{" "}
            {MAX_LABEL_UPLOAD_SIZE_MB} MB. The image is only a temporary input;
            the saved record will contain reviewed label data.
          </p>
        </div>

        <div className="rounded-[1.5rem] bg-[var(--accent-muted)] px-5 py-4 text-[var(--primary)]">
          <p className="text-3xl font-semibold tracking-[-0.06em]">
            {MAX_LABEL_UPLOAD_SIZE_MB} MB
          </p>
          <p className="mt-1 text-xs font-medium">temporary limit</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {uploadSteps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
                <Icon className="h-4 w-4" />
              </div>

              <p className="mt-4 text-sm font-semibold text-[var(--foreground)]/78">
                {step.title}
              </p>

              <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/52">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}