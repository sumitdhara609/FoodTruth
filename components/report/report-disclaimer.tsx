export function ReportDisclaimer() {
  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/68 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/35">
        Label literacy note
      </p>

      <p className="mt-2 text-xs leading-6 text-[var(--foreground)]/55">
        This report is educational and based only on the label values provided.
        It does not diagnose, treat, or replace professional medical guidance.
      </p>
    </div>
  );
}