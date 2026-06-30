import { History, ShieldCheck, Trophy, type LucideIcon } from "lucide-react";

export type AccountSignal = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const accountSignals: AccountSignal[] = [
  {
    title: "Saved label records",
    description:
      "A private archive of reviewed label data will appear here after sign-in is connected.",
    icon: History,
  },
  {
    title: "Badge progress",
    description:
      "Conscious label-checking milestones will be calculated from saved reports.",
    icon: Trophy,
  },
  {
    title: "Data-light records",
    description:
      "Records will store reviewed label data only, not uploaded image files or image metadata.",
    icon: ShieldCheck,
  },
];