import { describe, expect, it } from "vitest";
import {
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
});