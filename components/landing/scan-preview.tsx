const reportItems = [
  {
    label: "Nutrition Load",
    value: "High sugar density",
  },
  {
    label: "Ingredient Clarity",
    value: "3 sugar aliases found",
  },
  {
    label: "Claim Risk",
    value: "Health claim needs context",
  },
  {
    label: "Serving Reality",
    value: "5 servings per pack",
  },
];

export function ScanPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="absolute -left-8 top-16 hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl lg:block">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/45">
          Input Modes
        </p>
        <div className="mt-3 space-y-2 text-xs text-[var(--foreground)]/70">
          <p>Manual entry</p>
          <p>Label upload</p>
          <p>Instant scan</p>
        </div>
      </div>

      <div className="absolute -right-6 bottom-20 hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl lg:block">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/45">
          Report
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
          28
          <span className="text-sm text-[var(--foreground)]/45">/100</span>
        </p>
      </div>

      <div className="rounded-[2.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
                FoodTruth Scan
              </p>
              <p className="mt-1 text-[11px] text-[var(--foreground)]/45">
                Label intelligence preview
              </p>
            </div>

            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_24px_var(--accent)]" />
          </div>

          <div className="p-5">
            <div className="relative rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] p-4">
              <div className="absolute left-4 top-4 h-8 w-8 rounded-tl-2xl border-l border-t border-[var(--accent)]" />
              <div className="absolute right-4 top-4 h-8 w-8 rounded-tr-2xl border-r border-t border-[var(--accent)]" />
              <div className="absolute bottom-4 left-4 h-8 w-8 rounded-bl-2xl border-b border-l border-[var(--accent)]" />
              <div className="absolute bottom-4 right-4 h-8 w-8 rounded-br-2xl border-b border-r border-[var(--accent)]" />

              <div className="rounded-2xl bg-[var(--surface)] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      Choco Energy Bar
                    </p>
                    <p className="mt-1 text-xs text-[var(--foreground)]/45">
                      Demo Foods · Snack
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-[10px] font-medium text-[var(--primary)]">
                    Scanning
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  {["Sugar 16g", "Sodium 120mg", "Sat Fat 4g"].map((item) => (
                    <div
                      key={item}
                      className="h-9 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-xs text-[var(--foreground)]/55"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-[var(--foreground)]/45">
                    FoodTruth Score
                  </p>
                  <p className="mt-1 text-5xl font-semibold tracking-[-0.08em]">
                    28
                    <span className="text-lg text-[var(--foreground)]/40">
                      /100
                    </span>
                  </p>
                </div>
                <p className="rounded-full bg-[var(--danger)]/10 px-3 py-1 text-xs text-[var(--danger)]">
                  Very High Concern
                </p>
              </div>

              <div className="mt-5 space-y-2">
                {reportItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--foreground)]/35">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--foreground)]/72">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}