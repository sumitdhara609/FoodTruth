export type OcrExtractionTimelineStatus =
  | "complete"
  | "warning"
  | "skipped"
  | "pending";

export type OcrExtractionTimelineStep = {
  id: string;
  title: string;
  description: string;
  status: OcrExtractionTimelineStatus;
};

export type CreateOcrExtractionTimelineInput = {
  hasUploadInput: boolean;
  hasUploadObjectUrl: boolean;
  browserOcrAttempted: boolean;
  browserOcrSucceeded: boolean;
  fallbackUsed: boolean;
  ocrTextParsed: boolean;
  qualityEvaluated: boolean;
  decisionCreated: boolean;
};

export const createOcrExtractionTimeline = ({
  hasUploadInput,
  hasUploadObjectUrl,
  browserOcrAttempted,
  browserOcrSucceeded,
  fallbackUsed,
  ocrTextParsed,
  qualityEvaluated,
  decisionCreated,
}: CreateOcrExtractionTimelineInput): OcrExtractionTimelineStep[] => {
  return [
    {
      id: "upload-input",
      title: "Upload input",
      description: hasUploadInput
        ? "Temporary upload input was detected for this browser session."
        : "No temporary upload input was detected.",
      status: hasUploadInput ? "complete" : "warning",
    },
    {
      id: "image-reference",
      title: "Image reference",
      description: hasUploadObjectUrl
        ? "A temporary browser image reference was available for OCR."
        : "No temporary image reference was available, so browser OCR could not use the image directly.",
      status: hasUploadObjectUrl ? "complete" : "warning",
    },
    {
      id: "browser-ocr",
      title: "Browser OCR",
      description: browserOcrAttempted
        ? browserOcrSucceeded
          ? "Browser OCR extracted text from the uploaded image reference."
          : "Browser OCR was attempted but could not produce usable text."
        : "Browser OCR was skipped because the upload image reference was unavailable.",
      status: browserOcrAttempted
        ? browserOcrSucceeded
          ? "complete"
          : "warning"
        : "skipped",
    },
    {
      id: "fallback",
      title: "Extraction fallback",
      description: fallbackUsed
        ? "A fallback extraction draft was used so the review workflow could continue."
        : "Fallback was not needed.",
      status: fallbackUsed ? "warning" : "complete",
    },
    {
      id: "parse",
      title: "Text parsing",
      description: ocrTextParsed
        ? "OCR text was converted into structured review fields."
        : "OCR text has not been parsed yet.",
      status: ocrTextParsed ? "complete" : "pending",
    },
    {
      id: "quality",
      title: "Quality gate",
      description: qualityEvaluated
        ? "The structured draft was checked for missing and low-confidence fields."
        : "Draft quality has not been evaluated yet.",
      status: qualityEvaluated ? "complete" : "pending",
    },
    {
      id: "decision",
      title: "Review decision",
      description: decisionCreated
        ? "A next-step review decision was created."
        : "No review decision has been created yet.",
      status: decisionCreated ? "complete" : "pending",
    },
  ];
};