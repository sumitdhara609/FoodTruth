type AnalyzerStatusStripProps = {
  activeMode: string;
};

export function AnalyzerStatusStrip({ activeMode }: AnalyzerStatusStripProps) {
  return (
    <div className="grid gap-3 rounded-[1.75rem] border border-[var(--border)] bg-[var(--background)]/55 p-3 sm:grid-cols-3">
      <StatusItem label="Current mode" value={activeMode} />
      <StatusItem label="Input source" value="Entered label values" />
      <StatusItem label="Report state" value="Generated after validation" />
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] bg-[var(--surface)] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/35">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-[var(--foreground)]/72">
        {value}
      </p>
    </div>
  );
}