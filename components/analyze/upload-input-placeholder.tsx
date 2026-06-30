import { ImagePlus, ShieldCheck } from "lucide-react";
import { InputInfoCard } from "@/components/analyze/input-info-card";
import { InputPlaceholderCard } from "@/components/analyze/input-placeholder-card";
import { InputPlaceholderSection } from "@/components/analyze/input-placeholder-section";
import { MAX_LABEL_UPLOAD_SIZE_MB } from "@/lib/account/report-storage-policy";

export function UploadInputPlaceholder() {
  return (
    <InputPlaceholderSection>
      <InputPlaceholderCard
        icon={ImagePlus}
        title="Label image upload will appear here."
        description={`Future upload will accept JPG, PNG, or WEBP label images up to ${MAX_LABEL_UPLOAD_SIZE_MB} MB and convert them into reviewable label values.`}
        buttonLabel="Upload coming later"
      />

      <InputInfoCard
        icon={ShieldCheck}
        eyebrow="Storage rule"
        description="The image will be treated as a temporary input. FoodTruth records should preserve reviewed label data and report signals, not file names, file sizes, or original images."
      />
    </InputPlaceholderSection>
  );
}