import { analyzerLandingPageConfig } from "@/lib/analyze/analyzer-landing-page-config";

export function AnalyzerPageHeader() {
  return (
    <header>
      <p className="text-xs uppercase tracking-[0.32em] text-[var(--primary)]/70">
        {analyzerLandingPageConfig.eyebrow}
      </p>

      <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-[var(--foreground)] sm:text-5xl">
        {analyzerLandingPageConfig.title}
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58 sm:text-base sm:leading-8">
        {analyzerLandingPageConfig.description}
      </p>
    </header>
  );
}