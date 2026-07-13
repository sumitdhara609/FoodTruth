"use client";

import { ConfidenceCard } from "./confidence-card";
import { JsonViewer } from "./json-viewer";
import { PipelineStageCard } from "./pipeline-stage-card";
import { TimingCard } from "./timing-card";
import { WarningCard } from "./warning-card";

const pipelineStages = [
  "OCR",
  "OCR Cleaner",
  "Layout Analyzer",
  "Identity Extractor",
  "Ingredients Extractor",
  "Nutrition Extractor",
  "Validation",
  "FoodTruth Report",
];

export function StudioPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-8">

      <header className="space-y-2">

        <h1 className="text-4xl font-bold">
          FoodTruth Studio
        </h1>

        <p className="text-muted-foreground">
          Internal developer workspace for inspecting every
          stage of the FoodTruth extraction pipeline.
        </p>

      </header>

      <section className="grid gap-4">

        {pipelineStages.map(stage => (
          <PipelineStageCard
            key={stage}
            title={stage}
          />
        ))}

      </section>

      <section className="grid gap-6 lg:grid-cols-3">

        <ConfidenceCard />

        <TimingCard />

        <WarningCard />

      </section>

      <JsonViewer />

    </main>
  );
}