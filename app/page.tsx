import { Camera, Keyboard, Upload } from "lucide-react";
import { HeroActions } from "@/components/landing/hero-actions";
import { InputModeCard } from "@/components/landing/input-mode-card";
import { ScanPreview } from "@/components/landing/scan-preview";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const inputModes = [
  {
    title: "Scan",
    description:
      "A mobile-first scan flow designed for quick label checks during shopping.",
    icon: <Camera size={18} />,
  },
  {
    title: "Upload",
    description:
      "Upload a packaged food label image and turn it into a structured report.",
    icon: <Upload size={18} />,
  },
  {
    title: "Manual",
    description:
      "Enter nutrition values, ingredients, and front-label claims directly.",
    icon: <Keyboard size={18} />,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-4 sm:px-8 sm:py-8 lg:px-14">
      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-[var(--accent)]/18 blur-3xl" />
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
              Mobile-first · Free · Premium
            </div>
            <ThemeToggle />
          </div>
        </nav>

        <div className="relative z-10 grid flex-1 gap-12 py-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-center lg:py-16">
          <div>
            <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-muted)] px-4 py-2 text-xs font-medium text-[var(--primary)]">
              Labels can be read. FoodTruth helps them be understood.
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.075em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">
              Scan a label before it reaches your cart.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--foreground)]/68 sm:text-lg">
              FoodTruth helps decode packaged food labels through nutrition
              load, ingredient clarity, serving-size reality, and marketing
              claim awareness — designed for fast decisions while shopping.
            </p>

            <HeroActions />

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {inputModes.map((mode) => (
                <InputModeCard
                  key={mode.title}
                  title={mode.title}
                  description={mode.description}
                  icon={mode.icon}
                />
              ))}
            </div>

            <p className="mt-6 max-w-xl text-xs leading-6 text-[var(--foreground)]/45">
              Future signed-in experiences may store scan history and support
              optional health-context preferences, while keeping guidance
              educational and responsible.
            </p>
          </div>

          <ScanPreview />
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}