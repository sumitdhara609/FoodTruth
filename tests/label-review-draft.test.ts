import { describe, expect, it } from "vitest";
import {
  buildFoodLabelInputFromDraft,
  createDraftFromManualState,
  createEmptyLabelReviewDraft,
} from "@/lib/analyze/label-review-draft";
import { sampleManualLabel } from "@/lib/analyze/sample-manual-label";

describe("label review draft", () => {
  it("creates an empty draft for upload and scan review flows", () => {
    const uploadDraft = createEmptyLabelReviewDraft("upload");
    const scanDraft = createEmptyLabelReviewDraft("scan");

    expect(uploadDraft.source).toBe("upload");
    expect(scanDraft.source).toBe("scan");

    expect(uploadDraft.productName).toBe("");
    expect(uploadDraft.ingredients).toBe("");
    expect(uploadDraft.confidenceNotes).toEqual([]);
  });

  it("creates a review draft from existing manual label state", () => {
    const draft = createDraftFromManualState(sampleManualLabel, "manual");

    expect(draft.source).toBe("manual");
    expect(draft.productName).toBe("Multigrain Breakfast Bar");
    expect(draft.ingredients).toContain("whole grains");
    expect(draft.confidenceNotes).toEqual([]);
  });

  it("converts a review draft into FoodTruth engine input", () => {
    const draft = createDraftFromManualState(sampleManualLabel, "manual");
    const input = buildFoodLabelInputFromDraft(draft);

    expect(input.productName).toBe("Multigrain Breakfast Bar");
    expect(input.servingSizeGrams).toBe(40);
    expect(input.packSizeGrams).toBe(200);
    expect(input.claims).toEqual(["high fiber", "natural"]);
  });
});