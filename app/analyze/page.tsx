import Link from "next/link";
import { Camera, Keyboard, Upload } from "lucide-react";
import { AnalyzeModeCard } from "@/components/analyze/analyze-mode-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const analyzeModes = [
  {
    title: "Scan label",
    description:
      "Point the camera at a packaged food label and prepare it for structured analysis.",
    status: "Planned",
    icon: <Camera size={20} />,
    featured: true,
  },
  {
    title: "Upload label",
    description:
      "Add a clear label image and convert it into an understandable FoodTruth report.",
    status: "Planned",
    icon: <Upload size={20} />,
  },
  {
    title: "Enter manually",
    description:
      "Type nutrition values, ingredients, and front-label claims directly into the analyzer.",
    status: "First build",
    icon: <Keyboard size={20} />,
  },
];

export default function AnalyzePage() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-4 sm:px-8 sm:py-8 lg:px-14">
      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-[var(--accent)]/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <nav className="relative z-10 flex items-center justify-between gap-6">
          <div>
            <Link
              href="/"
              className="text-sm uppercase tracking-[0.38em] text-[var(--primary)]/75"
            >
              FoodTruth
            </Link>
            <p className="mt-1 text-xs text-[var(--foreground)]/50">
              Analyze a packaged food label
            </p>
          </div>

          <ThemeToggle />
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center py-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-muted)] px-4 py-2 text-xs font-medium text-[var(--primary)]">
              Choose how the label enters FoodTruth.
            </div>

            <h1 className="mt-7 text-5xl font-semibold tracking-[-0.075em] text-[var(--foreground)] sm:text-6xl">
              Begin with the label.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--foreground)]/62">
              FoodTruth turns label details into clearer nutrition,
              ingredient, claim, and serving-size understanding.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {analyzeModes.map((mode) => (
              <AnalyzeModeCard
                key={mode.title}
                title={mode.title}
                description={mode.description}
                status={mode.status}
                icon={mode.icon}
                featured={mode.featured}
              />
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-6 text-[var(--foreground)]/45">
            The first functional analyzer will begin with manual entry. Scan and
            upload flows will be added carefully after the report experience is
            stable.
          </p>
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}