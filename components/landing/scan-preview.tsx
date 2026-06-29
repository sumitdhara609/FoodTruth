const reportItems = [
  {
    label: "Nutrition Load",
    value: "Sugar density needs attention",
  },
  {
    label: "Ingredient Clarity",
    value: "Multiple sweetener terms found",
  },
  {
    label: "Claim Check",
    value: "Front claim needs back-label context",
  },
  {
    label: "Serving Reality",
    value: "Small serving size may change interpretation",
  },
];

const nutritionLines = ["Sugar 12g", "Sodium 110mg", "Fiber 2g", "Protein 4g"];

export function ScanPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      <div className="hidden lg:block absolute -left-4 top-16 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/55">
          Shopping Flow
        </p>
        <div className="mt-3 space-y-2 text-xs text-[var(--foreground)]/78">
          <p>Open on mobile</p>
          <p>Scan the label</p>
          <p>Understand before buying</p>
        </div>
      </div>

      <div className="hidden lg:block absolute -right-4 bottom-28 rounded-3xl border border-[var(--border)] bg-[var(--surface)]/95 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/55">
          FoodTruth
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          64
          <span className="ml-1 text-sm text-[var(--foreground)]/55">/100</span>
        </p>
        <p className="mt-1 text-[11px] text-[var(--warning)]">
          Needs context
        </p>
      </div>

      <div className="rounded-[2.6rem] border border-[var(--border)] bg-[var(--background)]/72 p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div className="overflow-hidden rounded-[2.05rem] border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/85">
                Live Label Scan
              </p>
              <p className="mt-1 text-[11px] text-[var(--foreground)]/60">
                Fast mobile-first preview
              </p>
            </div>

            <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-medium text-[var(--primary)]">
              Ready
            </span>
          </div>

          <div className="p-5">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="pointer-events-none absolute left-4 top-4 h-9 w-9 rounded-tl-3xl border-l-2 border-t-2 border-[var(--accent)]" />
              <div className="pointer-events-none absolute right-4 top-4 h-9 w-9 rounded-tr-3xl border-r-2 border-t-2 border-[var(--accent)]" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-9 w-9 rounded-bl-3xl border-b-2 border-l-2 border-[var(--accent)]" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-9 w-9 rounded-br-3xl border-b-2 border-r-2 border-[var(--accent)]" />

              <div className="rounded-[1.25rem] bg-[var(--surface)] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      Multigrain Breakfast Bar
                    </p>
                    <p className="mt-1 text-xs text-[var(--foreground)]/60">
                      Packaged snack · plant-based sample
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-medium text-[var(--primary)]">
                    Detected
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {nutritionLines.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs font-medium text-[var(--foreground)]/72"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/50">
                    Ingredients detected
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/72">
                    whole grains, dates, sugar, glucose syrup, cocoa, stabilizer
                  </p>
                </div>
              </div>

              <div className="pointer-events-none mt-4 h-px bg-[var(--accent)]/70 shadow-[0_0_24px_var(--accent)]" />
            </div>

            <div className="mt-5 rounded-[1.6rem] border border-[var(--border)] bg-[var(--background)]/72 p-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-[var(--foreground)]/58">
                    FoodTruth Score
                  </p>
                  <p className="mt-1 flex items-end gap-1 text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)]">
                    64
                    <span className="pb-1 text-lg tracking-normal text-[var(--foreground)]/50">
                      /100
                    </span>
                  </p>
                </div>

                <p className="shrink-0 rounded-full bg-[var(--warning)]/12 px-3 py-1 text-xs font-medium text-[var(--warning)]">
                  Needs context
                </p>
              </div>

              <div className="mt-5 space-y-2">
                {reportItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/48">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--foreground)]/78">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-[var(--accent-muted)] px-4 py-3">
                <p className="text-xs leading-5 text-[var(--primary)]">
                  FoodTruth explains the label clearly so users can decide with
                  better awareness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-sm text-center text-xs leading-6 text-[var(--foreground)]/55">
        Built for quick checks in real shopping moments — scan, understand,
        decide with awareness.
      </p>
    </div>
  );
}