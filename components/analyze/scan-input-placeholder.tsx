import { Camera, ScanLine, ShieldCheck } from "lucide-react";

export function ScanInputPlaceholder() {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_0.45fr] lg:items-center">
        <div className="rounded-[1.75rem] border border-dashed border-[var(--border)] bg-[var(--background)]/55 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
            <Camera className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            Camera scan will appear here.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--foreground)]/52">
            Future scan mode will help capture label values quickly, then turn
            them into a reviewable draft before any FoodTruth report is
            generated.
          </p>

          <button
            type="button"
            disabled
            className="mt-6 cursor-not-allowed rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)]/35"
          >
            Scan coming later
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/55 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
              <ScanLine className="h-5 w-5" />
            </div>

            <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
              Review first
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
              Detected values should be reviewed and corrected before FoodTruth
              creates a report.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/55 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
              Storage rule
            </p>

            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
              Camera images should remain temporary. Saved records should keep
              reviewed label data and report signals only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}