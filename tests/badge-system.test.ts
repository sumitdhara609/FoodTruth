import { describe, expect, it } from "vitest";
import {
  badgeTiers,
  getBadgeProgress,
  getEarnedBadges,
  getNextBadge,
} from "@/lib/account/badge-system";

describe("badge system", () => {
  it("keeps badge tiers ordered by required records", () => {
    const thresholds = badgeTiers.map((badge) => badge.requiredRecords);

    expect(thresholds).toEqual([10, 25, 50, 100, 250]);
  });

  it("returns earned badges based on saved report count", () => {
    expect(getEarnedBadges(0)).toHaveLength(0);
    expect(getEarnedBadges(10).map((badge) => badge.id)).toEqual([
      "label-aware",
    ]);
    expect(getEarnedBadges(50).map((badge) => badge.id)).toEqual([
      "label-aware",
      "ingredient-watcher",
      "conscious-consumer",
    ]);
  });

  it("returns the next badge", () => {
    expect(getNextBadge(0)?.id).toBe("label-aware");
    expect(getNextBadge(10)?.id).toBe("ingredient-watcher");
    expect(getNextBadge(250)).toBeUndefined();
  });

  it("calculates progress toward the next badge", () => {
    expect(getBadgeProgress(5)).toEqual({
      nextBadge: badgeTiers[0],
      remainingRecords: 5,
      progressPercentage: 50,
    });

    expect(getBadgeProgress(25)).toEqual({
      nextBadge: badgeTiers[2],
      remainingRecords: 25,
      progressPercentage: 0,
    });

    expect(getBadgeProgress(250)).toEqual({
      nextBadge: null,
      remainingRecords: 0,
      progressPercentage: 100,
    });
  });
});