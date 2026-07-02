"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import Link from "next/link";
import { saveUploadReviewReportAction } from "@/app/analyze/upload/review/actions";
import { ExtractionDraftSummary } from "@/components/analyze/extraction-draft-summary";
import { FormField } from "@/components/analyze/form-field";
import { FormSection } from "@/components/analyze/form-section";
import { FormTextarea } from "@/components/analyze/form-textarea";
import { FoodTruthReportPanel } from "@/components/report/foodtruth-report-panel";
import { mapExtractionDraftToManualState } from "@/lib/analyze/extraction-draft";
import { runActiveUploadExtraction } from "@/lib/analyze/extraction-provider-registry";
import {
  buildFoodLabelInputFromManualState,
  type ManualAnalyzerState,
} from "@/lib/analyze/manual-input-adapter";
import {
  nutritionFields,
  servingFields,
  type ManualNumericField,
} from "@/lib/analyze/manual-field-config";
import {
  parseUploadSessionInput,
  uploadSessionBridgeConfig,
} from "@/lib/analyze/upload-session-bridge";
import { realLabelUploadExtractionDraft } from "@/lib/analyze/upload-review-sample";
import {
  uploadReviewFormCopy,
  uploadReviewValueModeOptions,
  type UploadReviewValueMode,
} from "@/lib/analyze/upload-review-form-config";
import { generateValidatedFoodTruthReport } from "@/lib/engine/validated-foodtruth-engine";
import type { ValidatedFoodTruthResult } from "@/lib/engine/types";

const initialUploadReviewState: ManualAnalyzerState = {
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

const subscribeToUploadSession = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
};

const getUploadSessionSnapshot = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(uploadSessionBridgeConfig.storageKey);
};

const getUploadSessionServerSnapshot = () => {
  return null;
};

export function UploadReviewForm() {
  const uploadSessionSnapshot = useSyncExternalStore(
    subscribeToUploadSession,
    getUploadSessionSnapshot,
    getUploadSessionServerSnapshot
  );

  const uploadSessionResult = parseUploadSessionInput(uploadSessionSnapshot);
  const uploadInput = uploadSessionResult.success
    ? uploadSessionResult.input
    : null;
  const uploadInputMessage = uploadSessionResult.message;

  const [formState, setFormState] = useState<ManualAnalyzerState>(
    initialUploadReviewState
  );
  const [valueMode, setValueMode] =
    useState<UploadReviewValueMode>("per-serving");
  const [result, setResult] = useState<ValidatedFoodTruthResult | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [extractionMessage, setExtractionMessage] = useState<string | null>(
    null
  );
  const [isSaving, startSavingTransition] = useTransition();

  const fieldErrors = new Map(
    result && !result.success
      ? result.errors.map((error) => [error.field, error.message])
      : []
  );

  const updateField = (key: keyof ManualAnalyzerState, value: string) => {
    setFormState((currentState) => ({
      ...currentState,
      [key]: value,
    }));

    setSaveMessage(null);
    setExtractionMessage(null);
  };

  const getFieldError = (field: keyof ManualAnalyzerState) => {
    return fieldErrors.get(field);
  };

  const handleGenerateReport = () => {
    const nextResult = generateValidatedFoodTruthReport(
      buildFoodLabelInputFromManualState(formState)
    );

    setResult(nextResult);
    setSaveMessage(null);
  };

  const handleSaveReport = () => {
    if (!result?.success) {
      setSaveMessage("Generate a valid upload review report before saving.");
      return;
    }

    setSaveMessage(null);

    startSavingTransition(() => {
      void (async () => {
        const saveResult = await saveUploadReviewReportAction(formState);
        setSaveMessage(saveResult.message);
      })();
    });
  };

  const handleClearReview = () => {
    setFormState(initialUploadReviewState);
    setValueMode("per-serving");
    setResult(null);
    setSaveMessage(null);
    setExtractionMessage(null);
  };

  const handleRunExtraction = () => {
    setExtractionMessage(null);

    startSavingTransition(() => {
      void (async () => {
        const extractionResult = await runActiveUploadExtraction(
          uploadInput?.mimeType
        );

        if (!extractionResult.success) {
          setExtractionMessage(extractionResult.message);
          return;
        }

        setFormState(mapExtractionDraftToManualState(extractionResult.draft));
        setValueMode("per-serving");
        setResult(null);
        setSaveMessage(null);
        setExtractionMessage(extractionResult.message);
      })();
    });
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
    <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/78 p-5 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--primary)]/70">
              {uploadReviewFormCopy.eyebrow}
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)]">
              {uploadReviewFormCopy.title}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--foreground)]/58">
              {uploadReviewFormCopy.description}
            </p>
          </div>

          <Link
            href="/analyze/upload"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]/52 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            Back to upload
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {uploadReviewValueModeOptions.map((option) => {
            const isSelected = valueMode === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValueMode(option.value)}
                className={`rounded-[1.4rem] border px-4 py-3 text-left transition ${
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--accent-muted)]"
                    : "border-[var(--border)] bg-[var(--background)]/65 hover:bg-[var(--surface-muted)]"
                }`}
              >
                <span className="block text-sm font-semibold text-[var(--foreground)]/76">
                  {option.label}
                </span>

                <span className="mt-2 block text-xs leading-6 text-[var(--foreground)]/48">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--primary)]/70">
            Review Boundary
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
            {uploadReviewFormCopy.extraction}
          </p>

          <p className="mt-3 text-sm leading-7 text-[var(--foreground)]/55">
            {uploadReviewFormCopy.privacy}
          </p>
        </div>

        <div className="mt-4">
          <ExtractionDraftSummary draft={realLabelUploadExtractionDraft} />
        </div>

        {uploadInputMessage && (
          <div className="mt-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]/70 p-4 text-sm leading-6 text-[var(--foreground)]/55">
            {uploadInputMessage}
          </div>
        )}

        {extractionMessage && (
          <div className="mt-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)]/78 p-4 text-sm leading-6 text-[var(--foreground)]/55">
            {extractionMessage}
          </div>
        )}

        <div className="mt-8 space-y-5">
          <FormSection
            eyebrow="Identity"
            title="Label identity"
            description="Name the product as clearly as possible before entering nutrition values."
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <FormField
                  label="Product name"
                  value={formState.productName}
                  placeholder="Example: Real packaged snack label"
                  error={getFieldError("productName")}
                  onChange={(value) => updateField("productName", value)}
                />
              </div>

              <FormField
                label="Category"
                value={formState.category}
                placeholder="Packaged snack"
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
            title={
              valueMode === "per-serving"
                ? "Serving context"
                : "Per-100g context"
            }
            description={
              valueMode === "per-serving"
                ? "Enter serving and pack size exactly as visible on the label."
                : "If using per-100g values, set serving size carefully so interpretation remains clear."
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {servingFields.map(renderNumericField)}
            </div>
          </FormSection>

          <FormSection
            eyebrow="Nutrition"
            title="Reviewed nutrition values"
            description="Enter only values that are clearly visible and reliable from the uploaded label."
          >
            <div className="grid gap-4 sm:grid-cols-3">
              {nutritionFields.map(renderNumericField)}
            </div>
          </FormSection>

          <FormSection
            eyebrow="Ingredients"
            title="Ingredient list"
            description="Enter the visible ingredient list. Leave unclear content out instead of guessing."
          >
            <FormTextarea
              label="Ingredients"
              value={formState.ingredients}
              placeholder="Paste or type the visible ingredients."
              rows={5}
              error={getFieldError("ingredients")}
              onChange={(value) => updateField("ingredients", value)}
            />
          </FormSection>

          <FormSection
            eyebrow="Claims"
            title="Visible label claims"
            description="Add front-label claims only if they are visible on the uploaded label."
          >
            <FormField
              label="Claims"
              value={formState.claims}
              placeholder="Example: high fiber, no added sugar, natural"
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
            Generate upload report
          </button>

          <button
            type="button"
            onClick={handleRunExtraction}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)]/60 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            Run extraction draft
          </button>

          <button
            type="button"
            onClick={handleClearReview}
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)]/60 transition hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
          >
            Clear review
          </button>
        </div>
      </div>

      <FoodTruthReportPanel
        result={result}
        isSaving={isSaving}
        saveMessage={saveMessage}
        onSave={handleSaveReport}
        onReset={handleClearReview}
      />
    </section>
  );
}