export function AccountPageHeader() {
  return (
    <section className="pt-8">
      <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
        FoodTruth Account
      </p>

      <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
        <div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
            Your label intelligence archive.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
            This space will hold saved FoodTruth reports, badge progress, and
            personal label history after authentication is connected.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
            Account phase
          </p>

          <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
            The account foundation is being prepared before Supabase auth and
            database tables are connected.
          </p>
        </div>
      </div>
    </section>
  );
}