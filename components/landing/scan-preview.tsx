export function ScanPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="rounded-[2.25rem] border border-[var(--border)] bg-[var(--background)]/78 p-4 shadow-[var(--shadow-soft)]">
        <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.34em] text-[var(--primary)]/72">
                Live Label Scan
              </p>
              <p className="mt-1 text-sm text-[var(--foreground)]/48">
                Structured preview
              </p>
            </div>

            <span className="rounded-full bg-[var(--accent-muted)] px-4 py-2 text-xs font-semibold text-[var(--primary)]">
              Ready
            </span>
          </div>

          <div className="p-5">
            <div className="rounded-[1.6rem] border border-[var(--border)] bg-[var(--background)]/70 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                    Multigrain Breakfast Bar
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground)]/50">
                    Packaged snack · plant-based sample
                  </p>
                </div>

                <span className="w-fit rounded-full bg-[var(--accent-muted)] px-4 py-2 text-xs font-semibold text-[var(--primary)]">
                  Detected
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <PreviewSignal label="Sugar" value="12g" />
                <PreviewSignal label="Sodium" value="110mg" />
                <PreviewSignal label="Fiber" value="2g" />
                <PreviewSignal label="Protein" value="4g" />
              </div>

              <div className="mt-5 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)]/75 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/38">
                  Ingredients Detected
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/62">
                  whole grains, dates, sugar, glucose syrup, cocoa, stabilizer
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/75 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-[var(--foreground)]/42">
                      FoodTruth Score
                    </p>

                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-5xl font-semibold leading-none tracking-[-0.08em] text-[var(--foreground)]">
                        38
                      </span>
                      <span className="pb-1 text-sm font-semibold text-[var(--foreground)]/38">
                        /100
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-medium text-[var(--warning)]">
                      High Concern
                    </p>
                  </div>

                  <span className="rounded-full bg-[var(--accent-muted)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                    High
                  </span>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/75 p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--foreground)]/38">
                  Serving Reality
                </p>

                <p className="mt-3 text-sm leading-6 text-[var(--foreground)]/62">
                  Small serving size may change interpretation.
                </p>

                <div className="mt-4 rounded-[1.2rem] bg-[var(--accent-muted)] px-4 py-3 text-sm leading-6 text-[var(--primary)]">
                  FoodTruth explains the label clearly so users can decide with
                  better awareness.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewSignal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/75 px-4 py-3">
      <p className="text-xs text-[var(--foreground)]/42">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[var(--foreground)]/70">
        {value}
      </p>
    </div>
  );
}