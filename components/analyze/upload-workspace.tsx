"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { uploadWorkspaceSteps } from "@/lib/analyze/upload-workspace";

export function UploadWorkspace() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const hasPreview = Boolean(previewUrl);

  const previewStatus = useMemo(() => {
    if (!hasPreview) {
      return "Waiting for a label image.";
    }

    return "Label image is ready for review. The image is only used for local preview.";
  }, [hasPreview]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }

      return nextPreviewUrl;
    });

    event.target.value = "";
  };

  const handleClearPreview = () => {
    setPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl) {
        URL.revokeObjectURL(currentPreviewUrl);
      }

      return null;
    });
  };

  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          Upload Workspace
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          Upload a label for review.
        </h2>

        <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
          Add a packaged-food label image and use it as a temporary reference
          while preparing reviewed label data.
        </p>

        <label className="mt-7 flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-[var(--border)] bg-[var(--background)]/70 px-5 py-10 text-center transition hover:bg-[var(--surface-muted)]">
          <span className="text-sm font-semibold text-[var(--foreground)]/72">
            Choose label image
          </span>

          <span className="mt-2 max-w-sm text-xs leading-6 text-[var(--foreground)]/45">
            Use a clear photo of the nutrition panel, ingredients, or front
            label. The image is not saved by FoodTruth.
          </span>

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            onChange={handleImageChange}
          />
        </label>

        <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]/70">
            Privacy Rule
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
            FoodTruth does not store the uploaded image, file name, or file
            size. Only reviewed label data and report signals may be saved.
          </p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
              Review Preview
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              {hasPreview ? "Image ready." : "No image selected."}
            </h2>

            <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
              {previewStatus}
            </p>
          </div>

          {hasPreview && (
            <button
              type="button"
              onClick={handleClearPreview}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]/50 transition hover:bg-[var(--surface-muted)] hover:text-[var(--warning)]"
            >
              Clear image
            </button>
          )}
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/70">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Uploaded label preview"
              className="max-h-[420px] w-full object-contain"
            />
          ) : (
            <div className="flex min-h-[320px] items-center justify-center px-6 text-center">
              <p className="max-w-sm text-sm leading-7 text-[var(--foreground)]/42">
                The selected label preview will appear here. Use it as a
                reference while entering reviewed label data.
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {uploadWorkspaceSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--background)]/60 p-4"
            >
              <p className="text-xs font-semibold text-[var(--primary)]/70">
                Step {index + 1}
              </p>

              <p className="mt-2 text-sm font-semibold text-[var(--foreground)]/75">
                {step.title}
              </p>

              <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/48">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
  href="/analyze/upload/review"
  className="inline-flex justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-xs font-semibold text-[var(--background)] transition hover:opacity-90"
>
  Open upload review
</Link>

          <Link
            href="/account"
            className="inline-flex justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-semibold text-[var(--foreground)]/60 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            Open account archive
          </Link>
        </div>
      </div>
    </section>
  );
}