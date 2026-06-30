import Link from "next/link";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  action: (formData: FormData) => Promise<void>;
  buttonLabel: string;
  footerText: string;
  footerHref: string;
  footerLabel: string;
  message?: string;
};

export function AuthCard({
  eyebrow,
  title,
  description,
  action,
  buttonLabel,
  footerText,
  footerHref,
  footerLabel,
  message,
}: AuthCardProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--foreground)]">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-6 shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)]">
            {title}
          </h1>

          <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/58">
            {description}
          </p>

          {message && (
            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 px-4 py-3">
              <p className="text-xs leading-5 text-[var(--foreground)]/62">
                {message}
              </p>
            </div>
          )}

          <form action={action} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-[var(--foreground)]/62">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-[var(--foreground)]/62">
                Password
              </span>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Minimum 8 characters"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_18px_45px_rgba(22,63,47,0.18)] transition hover:opacity-90"
            >
              {buttonLabel}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--foreground)]/52">
            {footerText}{" "}
            <Link
              href={footerHref}
              className="font-semibold text-[var(--primary)]"
            >
              {footerLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}