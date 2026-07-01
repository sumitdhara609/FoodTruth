import { signOutAction } from "@/app/auth/actions";
import { accountSessionCopy } from "@/lib/account/account-session-copy";

type AccountSessionCardProps = {
  email?: string | null;
};

export function AccountSessionCard({ email }: AccountSessionCardProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            {accountSessionCopy.eyebrow}
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            {accountSessionCopy.title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/55">
            {accountSessionCopy.description}
          </p>

          {email && (
            <p className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]/60 px-4 py-3 text-xs font-medium text-[var(--foreground)]/62">
              {email}
            </p>
          )}
        </div>

        <form action={signOutAction}>
          <button
            type="submit"
            className="rounded-full border border-[var(--border)] bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--foreground)]/62 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            {accountSessionCopy.signOutLabel}
          </button>
        </form>
      </div>
    </section>
  );
}