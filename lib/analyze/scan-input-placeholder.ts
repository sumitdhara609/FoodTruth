import { Camera, ScanLine, ShieldCheck } from "lucide-react";
import type { InputPlaceholderConfig } from "@/lib/analyze/upload-input-placeholder";

export const scanInputPlaceholder: InputPlaceholderConfig = {
  icon: Camera,
  title: "Prepare a scan review.",
  description:
    "Scan mode now has a review-first workspace. Camera capture is still being prepared, but scan review will use extraction drafts before any FoodTruth report is generated.",
  buttonLabel: "Open scan workspace",
  infoItems: [
    {
      icon: ScanLine,
      eyebrow: "Review first",
      description:
        "Detected values must be reviewed and corrected before FoodTruth creates a report.",
    },
    {
      icon: ShieldCheck,
      eyebrow: "Storage rule",
      description:
        "Camera images remain temporary inputs. Saved records keep reviewed label data and report signals only.",
    },
  ],
};