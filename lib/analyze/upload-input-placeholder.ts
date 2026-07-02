import { ImagePlus, ShieldCheck, type LucideIcon } from "lucide-react";
import { MAX_LABEL_UPLOAD_SIZE_MB } from "@/lib/account/report-storage-policy";

export type InputInfoItem = {
  icon: LucideIcon;
  eyebrow: string;
  description: string;
};

export type InputPlaceholderConfig = {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  infoItems: InputInfoItem[];
};

export const uploadInputPlaceholder: InputPlaceholderConfig = {
  icon: ImagePlus,
  title: "Upload a label image.",
  description: `Upload supports JPG, PNG, or WEBP label images up to ${MAX_LABEL_UPLOAD_SIZE_MB} MB. FoodTruth uses the image as a temporary input so you can prepare reviewed label values before generating a report.`,
  buttonLabel: "Open upload review",
  infoItems: [
    {
      icon: ShieldCheck,
      eyebrow: "Storage rule",
      description:
        "The image is treated as a temporary input. FoodTruth records preserve reviewed label data and report signals, not file names, file sizes, or original images.",
    },
  ],
};