import { AnalyzerPlaceholderPage } from "@/components/analyze/analyzer-placeholder-page";
import { ScanInputPlaceholder } from "@/components/analyze/scan-input-placeholder";
import { ScanReviewPlaceholder } from "@/components/analyze/scan-review-placeholder";
import { scanAnalyzerPageConfig } from "@/lib/analyze/analyzer-placeholder-page-config";

export default function ScanAnalyzerPage() {
  return (
    <AnalyzerPlaceholderPage {...scanAnalyzerPageConfig}>
      <ScanInputPlaceholder />
      <ScanReviewPlaceholder />
    </AnalyzerPlaceholderPage>
  );
}