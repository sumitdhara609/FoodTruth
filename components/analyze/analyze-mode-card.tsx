import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnalyzeModeCardProps = {
  title: string;
  description: string;
  status: string;
  icon: ReactNode;
  featured?: boolean;
};

export function AnalyzeModeCard({
  title,
  description,
  status,
  icon,
  featured = false,
}: AnalyzeModeCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "group w-full rounded-[1.75rem] border p-5 text-left transition duration-300 hover:-translate-y-1",
        featured
          ? "border-[var(--primary)]/25 bg-[var(--primary)] text-[var(--background)] shadow-[0_24px_70px_rgba(22,63,47,0.22)]"
          : "border-[var(--border)] bg-[var(--surface)]/78 text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
      )}
    >
      <div
        className={cn(
          "grid h-12 w-12 place-items-center rounded-2xl transition group-hover:scale-105",
          featured
            ? "bg-[var(--background)]/12 text-[var(--background)]"
            : "bg-[var(--accent-muted)] text-[var(--primary)]"
        )}
      >
        {icon}
      </div>

      <div className="mt-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold tracking-[-0.04em]">{title}</p>
          <p
            className={cn(
              "mt-2 max-w-sm text-sm leading-6",
              featured
                ? "text-[var(--background)]/72"
                : "text-[var(--foreground)]/58"
            )}
          >
            {description}
          </p>
        </div>

        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-[10px] font-medium",
            featured
              ? "bg-[var(--background)]/12 text-[var(--background)]/78"
              : "bg-[var(--accent-muted)] text-[var(--primary)]"
          )}
        >
          {status}
        </span>
      </div>
    </button>
  );
}