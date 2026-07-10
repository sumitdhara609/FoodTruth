"use client";

import { useState, useTransition } from "react";

import { runBrowserOcrExtraction } from "@/lib/analyze/browser-ocr-provider";
import { mapExtractionDraftToManualState } from "@/lib/analyze/extraction-draft";
import {
  evaluateOcrDraftQuality,
  type OcrDraftQualityResult,
} from "@/lib/analyze/ocr-draft-quality";
import {
  createOcrExtractionTimeline,
  type OcrExtractionTimelineStep,
} from "@/lib/analyze/ocr-extraction-timeline";
import {
  createOcrFieldReviewChecklist,
  type OcrFieldReviewChecklistItem,
} from "@/lib/analyze/ocr-field-review-checklist";
import {
  getOcrReviewDecision,
  type OcrReviewDecision,
} from "@/lib/analyze/ocr-review-decision";
import { runMockUploadOcrTextExtraction } from "@/lib/analyze/ocr-text-provider";
import type { OcrTextResult } from "@/lib/analyze/ocr-text-result";
import type { ManualAnalyzerState } from "@/lib/analyze/manual-input-adapter";
import type { UploadImageInput } from "@/lib/analyze/upload-image-input";
import { buildExtractionDraft } from "@/lib/analyze/vision/draft-builder";

export type UploadAutomationResult = {
  draftState: ManualAnalyzerState | null;
  ocrTextResult: OcrTextResult | null;
  quality: OcrDraftQualityResult | null;
  decision: OcrReviewDecision | null;
  checklist: OcrFieldReviewChecklistItem[] | null;
  timeline: OcrExtractionTimelineStep[] | null;
  message: string | null;
};

const emptyResult: UploadAutomationResult = {
  draftState: null,
  ocrTextResult: null,
  quality: null,
  decision: null,
  checklist: null,
  timeline: null,
  message: null,
};

export function useUploadAutomation() {
  const [result, setResult] =
    useState<UploadAutomationResult>(emptyResult);

  const [isRunning, startTransition] = useTransition();

  const run = (
    uploadInput: UploadImageInput | null,
    uploadObjectUrl: string | null
  ) => {
    startTransition(() => {
      void (async () => {
        let ocrResult: OcrTextResult | null = null;

        let fallbackUsed = false;
        let browserAttempted = false;

        if (uploadInput && uploadObjectUrl) {
          browserAttempted = true;

          ocrResult = await runBrowserOcrExtraction({
            source: "upload",
            image: uploadObjectUrl,
            uploadInput,
          });
        }

        if (!ocrResult?.success) {
          fallbackUsed = true;

          ocrResult = await runMockUploadOcrTextExtraction(
            uploadInput ?? undefined
          );
        }

        if (!ocrResult.success) {
          setResult({
            draftState: null,
            ocrTextResult: ocrResult,
            quality: null,
            decision: null,
            checklist: null,
            timeline: createOcrExtractionTimeline({
              hasUploadInput: Boolean(uploadInput),
              hasUploadObjectUrl: Boolean(uploadObjectUrl),
              browserOcrAttempted: browserAttempted,
              browserOcrSucceeded: false,
              fallbackUsed,
              ocrTextParsed: false,
              qualityEvaluated: false,
              decisionCreated: false,
            }),
            message: ocrResult.message,
          });

          return;
        }

        const rawText = ocrResult.blocks
          .map((block) => block.text)
          .join("\n");

        const draft = await buildExtractionDraft(rawText);

        const quality = evaluateOcrDraftQuality(draft);

        const decision = getOcrReviewDecision(quality);

        const checklist = createOcrFieldReviewChecklist(draft);

        setResult({
          draftState: mapExtractionDraftToManualState(draft),
          ocrTextResult: ocrResult,
          quality,
          decision,
          checklist,
          timeline: createOcrExtractionTimeline({
            hasUploadInput: Boolean(uploadInput),
            hasUploadObjectUrl: Boolean(uploadObjectUrl),
            browserOcrAttempted: browserAttempted,
            browserOcrSucceeded: browserAttempted && !fallbackUsed,
            fallbackUsed,
            ocrTextParsed: true,
            qualityEvaluated: true,
            decisionCreated: true,
          }),
          message:
            "Label analyzed successfully. Review highlighted fields before generating the FoodTruth report.",
        });
      })();
    });
  };

  return {
    ...result,
    isRunning,
    run,
  };
}