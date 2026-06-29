"use client";

import { useMemo, useState } from "react";
import {
  buildFoodLabelInputFromManualState,
  type ManualAnalyzerState,
} from "@/lib/analyze/manual-input-adapter";
import { FoodTruthReportPanel } from "@/components/report/foodtruth-report-panel";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import type { ValidatedFoodTruthResult } from "@/lib/engine/types";

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

const sampleFormState: ManualAnalyzerState = {
  productName: "Multigrain Breakfast Bar",
  brandName: "Demo Foods",
  category: "Snack",
  servingSizeGrams: "40",
  packSizeGrams: "200",
  calories: "180",
  sugarGrams: "12",
  sodiumMg: "110",
  totalFatGrams: "6",
  saturatedFatGrams: "2",
  proteinGrams: "4",
  fiberGrams: "2",
  ingredients: "whole grains, dates, sugar, glucose syrup, cocoa, stabilizer",
  claims: "high fiber, natural",
};

export function ManualAnalyzerForm() {
  const [formState, setFormState] =
    useState<ManualAnalyzerState>(initialFormState);
  const [result, setResult] = useState<ValidatedFoodTruthResult | null>(null);

  const fieldErrors = useMemo(() => {
    if (!result || result.success) {
      return new Map<string, string>();
    }

    return new Map(result.errors.map((error) => [error.field, error.message]));
  }, [result]);

  const getFieldError = (field: keyof ManualAnalyzerState) => {
    return fieldErrors.get(field);
  };

  const getFieldClassName = (field: keyof ManualAnalyzerState) => {
    const hasError = fieldErrors.has(field);

    return hasError
      ? "mt-2 w-full rounded-2xl border border-[var(--danger)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--danger)]"
      : "mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition placeholder:text-[var(--foreground)]/30 focus:border-[var(--primary)]/40";
  };

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

  const handleUseSample = () => {
    setFormState(sampleFormState);
    setResult(null);
  };

  const handleClearForm = () => {
    setFormState(initialFormState);
    setResult(null);
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
              className={getFieldClassName("productName")}
            />
            {getFieldError("productName") && (
              <p className="mt-2 text-xs text-[var(--danger)]">
                {getFieldError("productName")}
              </p>
            )}
          </label>

          <label className="block">
            <span className="text-xs font-medium text-[var(--foreground)]/58">
              Category
            </span>
            <input
              value={formState.category}
              onChange={(event) => updateField("category", event.target.value)}
              placeholder="Snack"
              className={getFieldClassName("category")}
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
              className={getFieldClassName("brandName")}
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
                className={getFieldClassName(field.key)}
              />
              {getFieldError(field.key) && (
                <p className="mt-2 text-xs text-[var(--danger)]">
                  {getFieldError(field.key)}
                </p>
              )}
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
            className={`${getFieldClassName("ingredients")} resize-none leading-6`}
          />
          {getFieldError("ingredients") && (
            <p className="mt-2 text-xs text-[var(--danger)]">
              {getFieldError("ingredients")}
            </p>
          )}
        </label>

        <label className="mt-6 block">
          <span className="text-xs font-medium text-[var(--foreground)]/58">
            Front-label claims
          </span>
          <input
            value={formState.claims}
            onChange={(event) => updateField("claims", event.target.value)}
            placeholder="Example: high fiber, natural, no added sugar"
            className={getFieldClassName("claims")}
          />
        </label>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleGenerateReport}
            className="rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--background)] shadow-[0_18px_45px_rgba(22,63,47,0.18)] transition hover:opacity-90"
          >
            Generate preview report
          </button>

          <button
            type="button"
            onClick={handleUseSample}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)]/70 transition hover:bg-[var(--surface-muted)]"
          >
            Use sample label
          </button>

          <button
            type="button"
            onClick={handleClearForm}
            className="rounded-full px-6 py-3 text-sm font-semibold text-[var(--foreground)]/48 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]/70"
          >
            Clear
          </button>
        </div>
      </div>

      <FoodTruthReportPanel result={result} />
    </div>
  );
}