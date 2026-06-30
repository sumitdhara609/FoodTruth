import type { LucideIcon } from "lucide-react";

type AccountSignalCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function AccountSignalCard({
  title,
  description,
  icon: Icon,
}: AccountSignalCardProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/56">
        {description}
      </p>
    </div>
  );
}