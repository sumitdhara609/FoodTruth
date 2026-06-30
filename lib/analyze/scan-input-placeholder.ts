import { Camera, ScanLine, ShieldCheck } from "lucide-react";
import type { InputPlaceholderConfig } from "@/lib/analyze/upload-input-placeholder";

export const scanInputPlaceholder: InputPlaceholderConfig = {
  icon: Camera,
  title: "Camera scan will appear here.",
  description:
    "Future scan mode will help capture label values quickly, then turn them into a reviewable draft before any FoodTruth report is generated.",
  buttonLabel: "Scan coming later",
  infoItems: [
    {
      icon: ScanLine,
      eyebrow: "Review first",
      description:
        "Detected values should be reviewed and corrected before FoodTruth creates a report.",
    },
    {
      icon: ShieldCheck,
      eyebrow: "Storage rule",
      description:
        "Camera images should remain temporary. Saved records should keep reviewed label data and report signals only.",
    },
  ],
};