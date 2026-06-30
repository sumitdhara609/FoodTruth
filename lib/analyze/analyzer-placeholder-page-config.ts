import { ImagePlus, ScanLine, type LucideIcon } from "lucide-react";

export type AnalyzerPlaceholderPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  workflowTitle: string;
  workflowDescription: string;
  placeholderTitle: string;
  placeholderDescription: string;
  icon: LucideIcon;
};

export const uploadAnalyzerPageConfig: AnalyzerPlaceholderPageConfig = {
  eyebrow: "Upload Label",
  title: "Upload-based label analysis is being prepared.",
  description:
    "This mode will support label-image upload and structured extraction before generating a FoodTruth report. Manual entry remains active while the image workflow is built carefully.",
  workflowTitle: "Planned workflow",
  workflowDescription:
    "Upload image, detect readable label zones, review extracted values, then generate the same structured FoodTruth report.",
  placeholderTitle: "Upload flow placeholder",
  placeholderDescription:
    "The upload interface will be added after the manual engine, validation, and report experience are stable.",
  icon: ImagePlus,
};

export const scanAnalyzerPageConfig: AnalyzerPlaceholderPageConfig = {
  eyebrow: "Instant Scan",
  title: "Camera-led label scanning is being prepared.",
  description:
    "This mode will support quick label capture, reviewable extracted values, and the same FoodTruth report structure used by manual entry.",
  workflowTitle: "Planned workflow",
  workflowDescription:
    "Capture label, review detected values, correct mistakes, then generate a structured FoodTruth report.",
  placeholderTitle: "Scan flow placeholder",
  placeholderDescription:
    "The camera workflow will be added only after the upload and review pipeline is stable.",
  icon: ScanLine,
};