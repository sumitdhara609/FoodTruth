"use client";

import { useMemo, useState } from "react";
import { AnalyzerStatusStrip } from "@/components/analyze/analyzer-status-strip";
import { FormField } from "@/components/analyze/form-field";
import { FormSection } from "@/components/analyze/form-section";
import { FormTextarea } from "@/components/analyze/form-textarea";
import {
  buildFoodLabelInputFromManualState,
  type ManualAnalyzerState,
} from "@/lib/analyze/manual-input-adapter";
import {
  nutritionFields,
  servingFields,
  type ManualNumericField,
} from "@/lib/analyze/manual-field-config";
import { sampleManualLabel } from "@/lib/analyze/sample-manual-label";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import type { ValidatedFoodTruthResult } from "@/lib/engine/types";
import { FoodTruthReportPanel } from "@/components/report/foodtruth-report-panel";

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

  const fieldErrors = useMemo(() => {
    if (!result || result.success) {
      return new Map<string, string>();
    }

    return new Map(result.errors.map((error) => [error.field, error.message]));
  }, [result]);

  const getFieldError = (field: keyof ManualAnalyzerState) => {
    return fieldErrors.get(field);
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
    setFormState(sampleManualLabel);
    setResult(null);
  };

  const handleClearForm = () => {
    setFormState(initialFormState);
    setResult(null);
  };

  const renderNumericField = (field: ManualNumericField) => {
    return (
      <FormField
        key={field.key}
        label={field.label}
        value={formState[field.key]}
        placeholder={field.placeholder}
        inputMode="decimal"
        error={getFieldError(field.key)}
        onChange={(value) => updateField(field.key, value)}
      />
    );
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

        <div className="mt-6">
          <AnalyzerStatusStrip activeMode="Manual entry" />
        </div>

        <div className="mt-8 space-y-5">
          <FormSection
            eyebrow="Identity"
            title="Product details"
            description="Start with the basic label identity before reading the nutrition panel."
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField
                  label="Product name"
                  value={formState.productName}
                  placeholder="Example: Multigrain Breakfast Bar"
                  error={getFieldError("productName")}
                  onChange={(value) => updateField("productName", value)}
                />
              </div>

              <FormField
                label="Category"
                value={formState.category}
                placeholder="Snack"
                error={getFieldError("category")}
                onChange={(value) => updateField("category", value)}
              />

              <div className="sm:col-span-3">
                <FormField
                  label="Brand name"
                  value={formState.brandName}
                  placeholder="Optional"
                  error={getFieldError("brandName")}
                  onChange={(value) => updateField("brandName", value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            eyebrow="Serving"
            title="Serving context"
            description="Serving and pack size help FoodTruth understand how label values may scale."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {servingFields.map(renderNumericField)}
            </div>
          </FormSection>

          <FormSection
            eyebrow="Nutrition"
            title="Nutrition panel"
            description="Enter the visible nutrition values from the label as accurately as possible."
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {nutritionFields.map(renderNumericField)}
            </div>
          </FormSection>

          <FormSection
            eyebrow="Ingredients"
            title="Ingredient list"
            description="Paste the ingredient list exactly as written so FoodTruth can detect clarity signals."
          >
            <FormTextarea
              label="Ingredients"
              value={formState.ingredients}
              placeholder="Paste the ingredient list exactly as written on the label."
              rows={5}
              error={getFieldError("ingredients")}
              onChange={(value) => updateField("ingredients", value)}
            />
          </FormSection>

          <FormSection
            eyebrow="Claims"
            title="Front-label claims"
            description="Add visible claims such as high fiber, natural, no added sugar, or energy."
          >
            <FormField
              label="Claims"
              value={formState.claims}
              placeholder="Example: high fiber, natural, no added sugar"
              error={getFieldError("claims")}
              onChange={(value) => updateField("claims", value)}
            />
          </FormSection>
        </div>

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