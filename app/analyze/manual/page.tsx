import Link from "next/link";
import { ArrowRight, FileText, ImagePlus, ScanLine } from "lucide-react";

const analyzerModes = [
  {
    title: "Manual Entry",
    description:
      "Enter label values, ingredients, and claims to generate a structured FoodTruth report.",
    href: "/analyze/manual",
    status: "Active",
    icon: FileText,
  },
  {
    title: "Upload Label",
    description:
      "Upload a packaged-food label image and prepare it for structured analysis.",
    href: "#",
    status: "Planned",
    icon: ImagePlus,
  },
  {
    title: "Instant Scan",
    description:
      "Use a camera-led flow for quick label capture while shopping or comparing products.",
    href: "#",
    status: "Planned",
    icon: ScanLine,
  },
];

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--foreground)] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <section className="pt-8">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
            FoodTruth Analyzer
          </p>

          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
                Choose how the label enters the system.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
                FoodTruth begins with label details and turns them into a
                structured report across nutrition load, ingredient clarity,
                front-label claims, and serving-size reality.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]/72 p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--foreground)]/35">
                Current build
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/64">
                Manual entry is active first so the scoring engine, validation,
                and report experience stay stable before image-based flows are
                added.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {analyzerModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = mode.status === "Active";

            const card = (
              <div className="group flex h-full flex-col justify-between rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:bg-[var(--surface)]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-muted)] text-[var(--primary)]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/45">
                      {mode.status}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                    {mode.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/56">
                    {mode.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between text-sm font-medium text-[var(--primary)]">
                  <span>{isActive ? "Open analyzer" : "Coming later"}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            );

            return isActive ? (
              <Link key={mode.title} href={mode.href} className="block">
                {card}
              </Link>
            ) : (
              <div key={mode.title} className="cursor-not-allowed opacity-72">
                {card}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}