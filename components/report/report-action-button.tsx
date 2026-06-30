import type { ButtonHTMLAttributes, ReactNode } from "react";

type ReportActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function ReportActionButton({
  children,
  className = "",
  ...props
}: ReportActionButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]/62 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:text-[var(--foreground)]/30 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}