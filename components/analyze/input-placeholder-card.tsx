import type { LucideIcon } from "lucide-react";

type InputPlaceholderCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
};

export function InputPlaceholderCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
}: InputPlaceholderCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-[var(--border)] bg-[var(--background)]/55 p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
        <Icon className="h-6 w-6" />
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--foreground)]/52">
        {description}
      </p>

      <button
        type="button"
        disabled
        className="mt-6 cursor-not-allowed rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--foreground)]/35"
      >
        {buttonLabel}
      </button>
    </div>
  );
}