import { ImagePlus, ShieldCheck } from "lucide-react";
import { InputInfoCard } from "@/components/analyze/input-info-card";
import { InputPlaceholderCard } from "@/components/analyze/input-placeholder-card";
import { MAX_LABEL_UPLOAD_SIZE_MB } from "@/lib/account/report-storage-policy";

export function UploadInputPlaceholder() {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)]/76 p-5 shadow-[var(--shadow-soft)]">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_0.45fr] lg:items-center">
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
      </div>
    </section>
  );
}