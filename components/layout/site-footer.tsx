export function SiteFooter() {
  return (
    <footer className="relative z-10 flex flex-col gap-4 border-t border-[var(--border)] pt-5 text-xs text-[var(--foreground)]/48 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p>Educational label intelligence. Not medical advice.</p>
        <p className="mt-1">
          Manual entry now. Upload, scan, accounts, and saved history planned
          carefully.
        </p>
      </div>

      <div className="text-left sm:text-right">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--foreground)]/35">
          Crafted with clarity
        </p>
        <p className="mt-1 text-sm font-semibold tracking-[-0.03em] text-[var(--foreground)]/70">
          Sumit Dhara
        </p>
      </div>
    </footer>
  );
}