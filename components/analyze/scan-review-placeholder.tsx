import { ReviewFlowSection } from "@/components/analyze/review-flow-section";
import { scanReviewSteps } from "@/lib/analyze/scan-review-flow";

export function ScanReviewPlaceholder() {
  return (
    <ReviewFlowSection
      eyebrow="Scan Review Flow"
      title="Camera input will become a reviewable label draft."
      description="Scan mode will focus on quick capture, but FoodTruth will still ask the user to review detected values before generating or saving a report."
      statValue="Review"
      statLabel="before report"
      steps={scanReviewSteps}
    />
  );
}