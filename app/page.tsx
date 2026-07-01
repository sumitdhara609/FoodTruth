import Link from "next/link";
import { Camera, Keyboard, Upload } from "lucide-react";
import { InputModeCard } from "@/components/landing/input-mode-card";
import { ScanPreview } from "@/components/landing/scan-preview";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const inputModes = [
  {
    title: "Scan",
    description: "Capture a label and prepare it for structured review.",
    icon: <Camera size={18} />,
  },
  {
    title: "Upload",
    description: "Upload a label image and turn it into readable signals.",
    icon: <Upload size={18} />,
  },
  {
    title: "Manual",
    description: "Enter label values, ingredients, and claims directly.",
    icon: <Keyboard size={18} />,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-4 py-4 sm:px-8 sm:py-8 lg:px-14">
      <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)] backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-[var(--accent)]/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[var(--primary)]/10 blur-3xl" />

        <nav className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="group w-fit">
            <p className="text-sm uppercase tracking-[0.38em] text-[var(--primary)]/75 transition group-hover:text-[var(--primary)]">
              FoodTruth
            </p>
            <p className="mt-1 text-xs text-[var(--foreground)]/50">
              Packaged Food Label Intelligence
            </p>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-4 py-2 text-xs text-[var(--foreground)]/60 sm:inline-flex">
              Label Intelligence
            </span>

            <Link
              href="/analyze"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)]/70 px-4 py-2 text-xs font-semibold text-[var(--foreground)]/60 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            >
              Analyze
            </Link>

            <Link
              href="/auth/sign-in"
              className="rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--background)] shadow-[0_14px_35px_rgba(22,63,47,0.16)] transition hover:opacity-90"
            >
              Account
            </Link>

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
              claim awareness — designed for clear decisions while shopping.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/analyze"
                className="inline-flex justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_18px_45px_rgba(22,63,47,0.18)] transition hover:opacity-90"
              >
                Start analyzing
              </Link>

              <Link
                href="/auth/sign-in"
                className="inline-flex justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)]/70 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              >
                Open account
              </Link>
            </div>

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
              Signed-in experiences can save reviewed label reports while
              keeping FoodTruth educational, careful, and privacy-respecting.
            </p>
          </div>

          <ScanPreview />
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}