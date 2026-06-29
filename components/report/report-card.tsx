type ReportCardProps = {
  title: string;
  value: string;
};

export function ReportCard({ title, value }: ReportCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/38">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/72">
        {value}
      </p>
    </div>
  );
}