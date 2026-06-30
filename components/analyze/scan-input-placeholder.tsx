import { Camera, ScanLine, ShieldCheck } from "lucide-react";
import { InputPlaceholderCard } from "@/components/analyze/input-placeholder-card";

export function ScanInputPlaceholder() {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_0.45fr] lg:items-center">
        <InputPlaceholderCard
          icon={Camera}
          title="Camera scan will appear here."
          description="Future scan mode will help capture label values quickly, then turn them into a reviewable draft before any FoodTruth report is generated."
          buttonLabel="Scan coming later"
        />

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