import { FileCheck2, ShieldCheck, UploadCloud, type LucideIcon } from "lucide-react";

export type ReviewFlowStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const uploadReviewSteps: ReviewFlowStep[] = [
  {
    title: "Temporary upload",
    description:
      "The label image will be used only for extraction and review, not saved as a record.",
    icon: UploadCloud,
  },
  {
    title: "Review before report",
    description:
      "Extracted values will be shown for correction before FoodTruth generates a report.",
    icon: FileCheck2,
  },
  {
    title: "Data-light history",
    description:
      "Saved records will keep reviewed label data and report signals, not file names or image metadata.",
    icon: ShieldCheck,
  },
];