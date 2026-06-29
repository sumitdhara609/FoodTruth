export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)] pt-6 text-center">
      <p className="text-xs leading-6 text-[var(--foreground)]/48">
        Educational label intelligence. Not medical advice.
      </p>

      <p className="mt-1 text-xs leading-6 text-[var(--foreground)]/42">
        Manual entry now. Upload, scan, accounts, and saved history are being
        shaped carefully.
      </p>

      <div className="mx-auto mt-5 h-px w-20 bg-[var(--border)]" />

      <p className="mt-5 text-[10px] uppercase tracking-[0.32em] text-[var(--foreground)]/32">
        Crafted with clarity
      </p>

      <p className="mt-2 text-sm font-semibold tracking-[-0.03em] text-[var(--foreground)]/72">
        Sumit Dhara
      </p>
    </footer>
  );
}