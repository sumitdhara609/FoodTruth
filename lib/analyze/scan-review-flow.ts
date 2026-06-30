import { Camera, FileCheck2, ShieldCheck } from "lucide-react";
import type { ReviewFlowStep } from "@/lib/analyze/upload-review-flow";

export const scanReviewSteps: ReviewFlowStep[] = [
  {
    title: "Temporary capture",
    description:
      "The camera image will be used only to detect label values during the session.",
    icon: Camera,
  },
  {
    title: "Review before report",
    description:
      "Detected values will be shown for correction before FoodTruth generates a report.",
    icon: FileCheck2,
  },
  {
    title: "Data-light history",
    description:
      "Saved records will keep reviewed label data and report signals, not camera images or file metadata.",
    icon: ShieldCheck,
  },
];