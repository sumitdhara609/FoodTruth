export default function Home() {
  return (
    <main className="min-h-screen px-6 py-8 sm:px-10 lg:px-16">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/75 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-10 lg:p-14">
        <nav className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--primary)]/70">
              FoodTruth
            </p>
            <p className="mt-1 text-xs text-[var(--foreground)]/55">
              Label Intelligence Platform
            </p>
          </div>

          <div className="hidden rounded-full border border-[var(--border)] px-4 py-2 text-xs text-[var(--foreground)]/65 sm:block">
            Engine v0.1
          </div>
        </nav>

        <div className="grid gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-muted)] px-4 py-2 text-xs font-medium text-[var(--primary)]">
              The front label sells. The back label reveals.
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Understand what the label is really saying.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--foreground)]/68 sm:text-lg">
              FoodTruth is being built to decode packaged food labels through
              nutrition load, ingredient clarity, serving-size reality, and
              marketing claim awareness.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90">
                Analyze a Label
              </button>
              <button className="rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)]/75 transition hover:bg-[var(--surface-muted)]">
                View Engine Preview
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--background)]/65 p-5 shadow-[var(--shadow-soft)]">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">FoodTruth Score</p>
                <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-xs text-[var(--primary)]">
                  Demo
                </span>
              </div>

              <div className="mt-8">
                <p className="text-6xl font-semibold tracking-[-0.08em]">
                  28
                  <span className="text-2xl text-[var(--foreground)]/45">
                    /100
                  </span>
                </p>
                <p className="mt-3 text-sm text-[var(--danger)]">
                  Very High Concern
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  "High sugar density",
                  "Marketing claim risk",
                  "Serving-size framing",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3 text-sm"
                  >
                    <span className="text-[var(--foreground)]/70">{item}</span>
                    <span className="h-2 w-2 rounded-full bg-[var(--warning)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--foreground)]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Educational label intelligence. Not medical advice.</p>
          <p>Crafted with clarity by Sumit Dhara</p>
        </footer>
      </section>
    </main>
  );
}