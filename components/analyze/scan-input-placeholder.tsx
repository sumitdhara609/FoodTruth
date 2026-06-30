import { InputInfoCard } from "@/components/analyze/input-info-card";
import { InputPlaceholderCard } from "@/components/analyze/input-placeholder-card";
import { InputPlaceholderSection } from "@/components/analyze/input-placeholder-section";
import { scanInputPlaceholder } from "@/lib/analyze/scan-input-placeholder";

export function ScanInputPlaceholder() {
  return (
    <InputPlaceholderSection>
      <InputPlaceholderCard
        icon={scanInputPlaceholder.icon}
        title={scanInputPlaceholder.title}
        description={scanInputPlaceholder.description}
        buttonLabel={scanInputPlaceholder.buttonLabel}
      />

      <div className="space-y-4">
        {scanInputPlaceholder.infoItems.map((item) => (
          <InputInfoCard
            key={item.eyebrow}
            icon={item.icon}
            eyebrow={item.eyebrow}
            description={item.description}
          />
        ))}
      </div>
    </InputPlaceholderSection>
  );
}