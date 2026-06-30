import { ScanLine } from "lucide-react";
import { AnalyzerPlaceholderPage } from "@/components/analyze/analyzer-placeholder-page";

export default function ScanAnalyzerPage() {
  return (
    <AnalyzerPlaceholderPage
      eyebrow="Instant Scan"
      title="Camera-led label scanning is being prepared."
      description="This mode will support quick label capture, reviewable extracted values, and the same FoodTruth report structure used by manual entry."
      workflowTitle="Planned workflow"
      workflowDescription="Capture label, review detected values, correct mistakes, then generate a structured FoodTruth report."
      placeholderTitle="Scan flow placeholder"
      placeholderDescription="The camera workflow will be added only after the upload and review pipeline is stable."
      icon={ScanLine}
    />
  );
}