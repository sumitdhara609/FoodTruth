export function AccountDashboardPlaceholder() {
  return (
    <section className="mt-10 rounded-[2rem] border border-dashed border-[var(--border)] bg-[var(--surface)]/55 p-8 text-center">
      <p className="text-sm font-medium text-[var(--foreground)]/70">
        Account dashboard placeholder
      </p>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--foreground)]/50">
        Supabase authentication and saved report history will be connected
        after the local account model remains stable.
      </p>
    </section>
  );
}