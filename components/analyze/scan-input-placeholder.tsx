import { Camera, ScanLine, ShieldCheck } from "lucide-react";
import { InputInfoCard } from "@/components/analyze/input-info-card";
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
          <InputInfoCard
            icon={ScanLine}
            eyebrow="Review first"
            description="Detected values should be reviewed and corrected before FoodTruth creates a report."
          />

          <InputInfoCard
            icon={ShieldCheck}
            eyebrow="Storage rule"
            description="Camera images should remain temporary. Saved records should keep reviewed label data and report signals only."
          />
        </div>
      </div>
    </section>
  );
}