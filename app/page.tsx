import { ScanPreview } from "@/components/landing/scan-preview";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const inputModes = [
  {
    title: "Manual",
    description: "Enter nutrition values, ingredients, and claims directly.",
  },
  {
    title: "Upload",
    description: "Upload a label image for structured label understanding.",
  },
  {
    title: "Scan",
    description: "Use a mobile-first camera flow for instant label capture.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-5 py-5 sm:px-8 sm:py-8 lg:px-14">
      <section className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-7xl flex-col overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--surface)]/72 p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[var(--accent)]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <nav className="relative z-10 flex items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-[var(--primary)]/75">
              FoodTruth
            </p>
            <p className="mt-1 text-xs text-[var(--foreground)]/50">
              Packaged Food Label Intelligence
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-4 py-2 text-xs text-[var(--foreground)]/60 sm:block">
              Engine v0.1
            </div>
            <ThemeToggle />
          </div>
        </nav>

        <div className="relative z-10 grid flex-1 gap-12 py-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:py-16">
          <div>
            <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-muted)] px-4 py-2 text-xs font-medium text-[var(--primary)]">
              The front label sells. FoodTruth reads what matters.
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.075em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Upload. Scan. Understand.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--foreground)]/68 sm:text-lg">
              FoodTruth is being built as a premium label-intelligence platform
              that helps people understand packaged food labels through
              nutrition load, ingredient clarity, serving-size reality, and
              marketing claim awareness.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {inputModes.map((mode) => (
                <div
                  key={mode.title}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--background)]/60 p-4 transition hover:-translate-y-0.5 hover:bg-[var(--surface-muted)]"
                >
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {mode.title}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/55">
                    {mode.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_18px_45px_rgba(22,63,47,0.18)] transition hover:opacity-90">
                Start Label Analysis
              </button>
              <button className="rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-6 py-3 text-sm font-semibold text-[var(--foreground)]/75 transition hover:bg-[var(--surface-muted)]">
                Explore Engine Logic
              </button>
            </div>

            <p className="mt-6 max-w-xl text-xs leading-6 text-[var(--foreground)]/45">
              Educational label intelligence only. FoodTruth does not provide
              medical advice, diet instructions, or fear-based food judgments.
            </p>
          </div>

          <ScanPreview />
        </div>

        <footer className="relative z-10 flex flex-col gap-3 border-t border-[var(--border)] pt-5 text-xs text-[var(--foreground)]/48 sm:flex-row sm:items-center sm:justify-between">
          <p>Manual entry now. Upload and scan flows planned carefully.</p>
          <p>Crafted with clarity by Sumit Dhara</p>
        </footer>
      </section>
    </main>
  );
}