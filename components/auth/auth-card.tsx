import type { ReactNode } from "react";

type AuthCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  footer: ReactNode;
  message?: string;
  showNameField?: boolean;
};

export function AuthCard({
  eyebrow,
  title,
  description,
  action,
  submitLabel,
  footer,
  message,
  showNameField = false,
}: AuthCardProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-10 text-[var(--foreground)]">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/82 p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--primary)]/70">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)]">
            {title}
          </h1>

          <p className="mt-4 text-sm leading-7 text-[var(--foreground)]/55">
            {description}
          </p>

          {message && (
            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background)]/70 px-4 py-3 text-sm leading-6 text-[var(--foreground)]/60">
              {message}
            </div>
          )}

          <form action={action} className="mt-7 space-y-4">
            {showNameField && (
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/45">
                  Name
                </span>

                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/28 focus:border-[var(--primary)]"
                />
              </label>
            )}

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/45">
                Email
              </span>

              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/28 focus:border-[var(--primary)]"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/45">
                Password
              </span>

              <input
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="Minimum 8 characters"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/28 focus:border-[var(--primary)]"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90"
            >
              {submitLabel}
            </button>
          </form>

          <div className="mt-6 text-sm text-[var(--foreground)]/50">
            {footer}
          </div>
        </section>
      </div>
    </main>
  );
}