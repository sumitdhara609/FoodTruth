const nutritionFields = [
  "Serving size",
  "Pack size",
  "Calories",
  "Sugar",
  "Sodium",
  "Total fat",
  "Saturated fat",
  "Protein",
  "Fiber",
];

export function ManualAnalyzerForm() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
            Manual Entry
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
            Enter label details
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58">
            Add the visible nutrition values, ingredients, and front-label
            claims. FoodTruth will later convert this into a structured report.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-[var(--foreground)]/58">
              Product name
            </span>
            <input
              placeholder="Example: Multigrain Breakfast Bar"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-[var(--foreground)]/58">
              Brand name
            </span>
            <input
              placeholder="Optional"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {nutritionFields.map((field) => (
            <label key={field} className="block">
              <span className="text-xs font-medium text-[var(--foreground)]/58">
                {field}
              </span>
              <input
                placeholder="0"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
              />
            </label>
          ))}
        </div>

        <label className="mt-6 block">
          <span className="text-xs font-medium text-[var(--foreground)]/58">
            Ingredients
          </span>
          <textarea
            placeholder="Paste the ingredient list exactly as written on the label."
            rows={5}
            className="mt-2 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
          />
        </label>

        <label className="mt-6 block">
          <span className="text-xs font-medium text-[var(--foreground)]/58">
            Front-label claims
          </span>
          <input
            placeholder="Example: high fiber, natural, no added sugar"
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
          />
        </label>

        <button className="mt-8 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_18px_45px_rgba(22,63,47,0.18)] transition hover:opacity-90">
          Generate preview report
        </button>
      </div>

      <aside className="rounded-[2rem] border border-[var(--border)] bg-[var(--background)]/65 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          Report Preview
        </p>

        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
          A clearer label report will appear here.
        </h3>

        <div className="mt-8 space-y-3">
          {[
            "Nutrition load",
            "Ingredient clarity",
            "Claim check",
            "Serving reality",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4"
            >
              <p className="text-sm font-medium text-[var(--foreground)]/72">
                {item}
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--foreground)]/45">
                Waiting for label details.
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-6 text-[var(--foreground)]/45">
          The first working version will connect this form to the existing
          FoodTruth engine and validation layer.
        </p>
      </aside>
    </div>
  );
}