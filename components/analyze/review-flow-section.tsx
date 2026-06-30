import type { ReviewFlowStep } from "@/lib/analyze/upload-review-flow";
import { ReviewStepCard } from "@/components/analyze/review-step-card";

type ReviewFlowSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  steps: ReviewFlowStep[];
};

export function ReviewFlowSection({
  eyebrow,
  title,
  description,
  statValue,
  statLabel,
  steps,
}: ReviewFlowSectionProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            {title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/56">
            {description}
          </p>
        </div>

        <div className="rounded-[1.5rem] bg-[var(--accent-muted)] px-5 py-4 text-[var(--primary)]">
          <p className="text-3xl font-semibold tracking-[-0.06em]">
            {statValue}
          </p>
          <p className="mt-1 text-xs font-medium">{statLabel}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {steps.map((step) => (
          <ReviewStepCard
            key={step.title}
            title={step.title}
            description={step.description}
            icon={step.icon}
          />
        ))}
      </div>
    </section>
  );
}