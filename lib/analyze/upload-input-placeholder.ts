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
  title: "Label image upload will appear here.",
  description: `Future upload will accept JPG, PNG, or WEBP label images up to ${MAX_LABEL_UPLOAD_SIZE_MB} MB and convert them into reviewable label values.`,
  buttonLabel: "Upload coming later",
  infoItems: [
    {
      icon: ShieldCheck,
      eyebrow: "Storage rule",
      description:
        "The image will be treated as a temporary input. FoodTruth records should preserve reviewed label data and report signals, not file names, file sizes, or original images.",
    },
  ],
};