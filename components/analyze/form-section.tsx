import type { ReactNode } from "react";

type FormSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function FormSection({
  eyebrow,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/45 p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--primary)]/65">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-lg font-semibold tracking-[-0.04em] text-[var(--foreground)]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/50">
        {description}
      </p>

      <div className="mt-5">{children}</div>
    </section>
  );
}