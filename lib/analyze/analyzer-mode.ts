import { FileText, ImagePlus, ScanLine, type LucideIcon } from "lucide-react";

export type AnalyzerModeStatus = "Active" | "Planned";

export type AnalyzerMode = {
  title: string;
  description: string;
  href: string;
  status: AnalyzerModeStatus;
  icon: LucideIcon;
};

export const analyzerModes: AnalyzerMode[] = [
  {
    title: "Manual Entry",
    description:
      "Enter label values, ingredients, and claims to generate a structured FoodTruth report.",
    href: "/analyze/manual",
    status: "Active",
    icon: FileText,
  },
  {
    title: "Upload Label",
    description:
      "Upload a packaged-food label image and prepare it for structured analysis.",
   href: "/analyze/upload",
    status: "Planned",
    icon: ImagePlus,
  },
  {
    title: "Instant Scan",
    description:
      "Use a camera-led flow for quick label capture while shopping or comparing products.",
    href: "/analyze/upload",
    status: "Planned",
    icon: ScanLine,
  },
];