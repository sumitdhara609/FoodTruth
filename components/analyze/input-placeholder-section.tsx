import type { ReactNode } from "react";

type InputPlaceholderSectionProps = {
  children: ReactNode;
};

export function InputPlaceholderSection({
  children,
}: InputPlaceholderSectionProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_0.45fr] lg:items-center">
        {children}
      </div>
    </section>
  );
}