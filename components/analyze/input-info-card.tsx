import type { LucideIcon } from "lucide-react";

type InputInfoCardProps = {
  icon: LucideIcon;
  eyebrow: string;
  description: string;
};

export function InputInfoCard({
  icon: Icon,
  eyebrow,
  description,
}: InputInfoCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/55 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
        <Icon className="h-5 w-5" />
      </div>

      <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
        {eyebrow}
      </p>

      <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
        {description}
      </p>
    </div>
  );
}