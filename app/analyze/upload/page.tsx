import { ImagePlus } from "lucide-react";
import { AnalyzerPlaceholderPage } from "@/components/analyze/analyzer-placeholder-page";
import { UploadReviewPlaceholder } from "@/components/analyze/upload-review-placeholder";

export default function UploadAnalyzerPage() {
  return (
    <>
      <AnalyzerPlaceholderPage
        eyebrow="Upload Label"
        title="Upload-based label analysis is being prepared."
        description="This mode will support label-image upload and structured extraction before generating a FoodTruth report. Manual entry remains active while the image workflow is built carefully."
        workflowTitle="Planned workflow"
        workflowDescription="Upload image, detect readable label zones, review extracted values, then generate the same structured FoodTruth report."
        placeholderTitle="Upload flow placeholder"
        placeholderDescription="The upload interface will be added after the manual engine, validation, and report experience are stable."
        icon={ImagePlus}
      />

      <UploadReviewPlaceholder />
    </>
  );
}