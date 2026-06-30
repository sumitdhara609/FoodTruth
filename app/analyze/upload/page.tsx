import { AnalyzerPlaceholderPage } from "@/components/analyze/analyzer-placeholder-page";
import { UploadInputPlaceholder } from "@/components/analyze/upload-input-placeholder";
import { UploadReviewPlaceholder } from "@/components/analyze/upload-review-placeholder";
import { uploadAnalyzerPageConfig } from "@/lib/analyze/analyzer-placeholder-page-config";

export default function UploadAnalyzerPage() {
  return (
    <AnalyzerPlaceholderPage {...uploadAnalyzerPageConfig}>
      <UploadInputPlaceholder />
      <UploadReviewPlaceholder />
    </AnalyzerPlaceholderPage>
  );
}