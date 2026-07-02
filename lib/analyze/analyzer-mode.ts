import { FileText, ScanLine, Upload, type LucideIcon } from "lucide-react";

export type AnalyzerModeStatus = "Active" | "Foundation";

export type AnalyzerMode = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status: AnalyzerModeStatus;
  actionLabel: string;
};

export const analyzerModes: AnalyzerMode[] = [
  {
    title: "Manual Entry",
    description:
      "Enter label values, ingredients, and claims to generate a structured FoodTruth report.",
    href: "/analyze/manual",
    icon: FileText,
    status: "Active",
    actionLabel: "Open analyzer",
  },
  {
    title: "Upload Label",
    description:
      "Upload a packaged-food label image, create an extraction draft, review the values, and generate a report.",
    href: "/analyze/upload",
    icon: Upload,
    status: "Active",
    actionLabel: "Open upload review",
  },
  {
    title: "Instant Scan",
    description:
      "Prepare camera-led label capture through a review-first scan workflow.",
    href: "/analyze/scan",
    icon: ScanLine,
    status: "Foundation",
    actionLabel: "Open scan workspace",
  },
];

export const isAnalyzerModeActive = (mode: AnalyzerMode) => {
  return mode.status === "Active";
};

export const getActiveAnalyzerModes = () => {
  return analyzerModes.filter(isAnalyzerModeActive);
};

export const getPlannedAnalyzerModes = () => {
  return analyzerModes.filter((mode) => mode.status !== "Active");
};