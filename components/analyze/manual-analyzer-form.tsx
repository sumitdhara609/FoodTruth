"use client";

import { useMemo, useState } from "react";
import {
  buildFoodLabelInputFromManualState,
  type ManualAnalyzerState,
} from "@/lib/analyze/manual-input-adapter";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import type {
  FoodTruthReport,
  ValidatedFoodTruthResult,
} from "@/lib/engine/types";

type NumericField = {
  key:
    | "servingSizeGrams"
    | "packSizeGrams"
    | "calories"
    | "sugarGrams"
    | "sodiumMg"
    | "totalFatGrams"
    | "saturatedFatGrams"
    | "proteinGrams"
    | "fiberGrams";
  label: string;
  placeholder: string;
};

const numericFields: NumericField[] = [
  {
    key: "servingSizeGrams",
    label: "Serving size",
    placeholder: "40",
  },
  {
    key: "packSizeGrams",
    label: "Pack size",
    placeholder: "200",
  },
  {
    key: "calories",
    label: "Calories",
    placeholder: "180",
  },
  {
    key: "sugarGrams",
    label: "Sugar",
    placeholder: "12",
  },
  {
    key: "sodiumMg",
    label: "Sodium",
    placeholder: "110",
  },
  {
    key: "totalFatGrams",
    label: "Total fat",
    placeholder: "6",
  },
  {
    key: "saturatedFatGrams",
    label: "Saturated fat",
    placeholder: "2",
  },
  {
    key: "proteinGrams",
    label: "Protein",
    placeholder: "4",
  },
  {
    key: "fiberGrams",
    label: "Fiber",
    placeholder: "2",
  },
];

const initialFormState: ManualAnalyzerState = {
  productName: "",
  brandName: "",
  category: "",
  servingSizeGrams: "",
  packSizeGrams: "",
  calories: "",
  sugarGrams: "",
  sodiumMg: "",
  totalFatGrams: "",
  saturatedFatGrams: "",
  proteinGrams: "",
  fiberGrams: "",
  ingredients: "",
  claims: "",
};

export function ManualAnalyzerForm() {
  const [formState, setFormState] =
    useState<ManualAnalyzerState>(initialFormState);
  const [result, setResult] = useState<ValidatedFoodTruthResult | null>(null);

  const report = useMemo<FoodTruthReport | null>(() => {
    if (!result?.success) {
      return null;
    }

    return result.report;
  }, [result]);

  const updateField = (key: keyof ManualAnalyzerState, value: string) => {
    setFormState((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  };

  const handleGenerateReport = () => {
    const nextResult = generateValidatedFoodTruthReport(
      buildFoodLabelInputFromManualState(formState)
    );

    setResult(nextResult);
  };

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
            claims. FoodTruth will convert them into a structured label report.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium text-[var(--foreground)]/58">
              Product name
            </span>
            <input
              value={formState.productName}
              onChange={(event) =>
                updateField("productName", event.target.value)
              }
              placeholder="Example: Multigrain Breakfast Bar"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-[var(--foreground)]/58">
              Category
            </span>
            <input
              value={formState.category}
              onChange={(event) => updateField("category", event.target.value)}
              placeholder="Snack"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
            />
          </label>

          <label className="block sm:col-span-3">
            <span className="text-xs font-medium text-[var(--foreground)]/58">
              Brand name
            </span>
            <input
              value={formState.brandName}
              onChange={(event) => updateField("brandName", event.target.value)}
              placeholder="Optional"
              className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {numericFields.map((field) => (
            <label key={field.key} className="block">
              <span className="text-xs font-medium text-[var(--foreground)]/58">
                {field.label}
              </span>
              <input
                value={formState[field.key]}
                onChange={(event) => updateField(field.key, event.target.value)}
                placeholder={field.placeholder}
                inputMode="decimal"
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
            value={formState.ingredients}
            onChange={(event) => updateField("ingredients", event.target.value)}
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
            value={formState.claims}
            onChange={(event) => updateField("claims", event.target.value)}
            placeholder="Example: high fiber, natural, no added sugar"
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40"
          />
        </label>

        <button
          type="button"
          onClick={handleGenerateReport}
          className="mt-8 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_18px_45px_rgba(22,63,47,0.18)] transition hover:opacity-90"
        >
          Generate preview report
        </button>
      </div>

      <aside className="rounded-[2rem] border border-[var(--border)] bg-[var(--background)]/65 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
          Report Preview
        </p>

        {!result && (
          <>
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
          </>
        )}

        {result && !result.success && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
              Some details need correction.
            </h3>

            <div className="mt-6 space-y-3">
              {result.errors.map((error) => (
                <div
                  key={`${error.field}-${error.message}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
                >
                  <p className="text-xs font-semibold text-[var(--danger)]">
                    {error.field}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[var(--foreground)]/62">
                    {error.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {report && (
          <div className="mt-6">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="text-sm text-[var(--foreground)]/48">
                FoodTruth Score
              </p>
              <p className="mt-2 text-5xl font-semibold tracking-[-0.08em] text-[var(--foreground)]">
                {report.score}
                <span className="ml-1 text-lg text-[var(--foreground)]/45">
                  /100
                </span>
              </p>
              <p className="mt-3 text-sm text-[var(--warning)]">
                {report.grade}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <ReportCard
                title="Nutrition load"
                value={`Sugar: ${report.nutritionLoad.sugarLoad} · Sodium: ${report.nutritionLoad.sodiumLoad}`}
              />
              <ReportCard
                title="Ingredient clarity"
                value={`${report.ingredientClarity.ingredientCount} ingredients · ${report.ingredientClarity.ingredientComplexity} complexity`}
              />
              <ReportCard
                title="Claim check"
                value={`${report.claimRisk.overallRisk} claim risk`}
              />
              <ReportCard
                title="Serving reality"
                value={`${report.servingSizeReality.servingsPerPack} servings · ${report.servingSizeReality.risk} risk`}
              />
            </div>

            <div className="mt-5 rounded-2xl bg-[var(--accent-muted)] px-4 py-3">
              <p className="text-xs leading-6 text-[var(--primary)]">
                {report.summary}
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

type ReportCardProps = {
  title: string;
  value: string;
};

function ReportCard({ title, value }: ReportCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--foreground)]/38">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground)]/72">
        {value}
      </p>
    </div>
  );
}