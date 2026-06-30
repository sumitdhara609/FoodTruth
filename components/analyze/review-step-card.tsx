import type { LucideIcon } from "lucide-react";

type ReviewStepCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ReviewStepCard({
  title,
  description,
  icon: Icon,
}: ReviewStepCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/60 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
        <Icon className="h-4 w-4" />
      </div>

      <p className="mt-4 text-sm font-semibold text-[var(--foreground)]/78">
        {title}
      </p>

      <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/52">
        {description}
      </p>
    </div>
  );
}