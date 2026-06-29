import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputModeCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
};

export function InputModeCard({
  title,
  description,
  icon,
  className,
}: InputModeCardProps) {
  return (
    <div
      className={cn(
        "group rounded-3xl border border-[var(--border)] bg-[var(--background)]/60 p-4 transition duration-300 hover:-translate-y-1 hover:bg-[var(--surface-muted)]",
        className
      )}
    >
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)] transition group-hover:scale-105">
        {icon}
      </div>

      <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>

      <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/55">
        {description}
      </p>
    </div>
  );
}