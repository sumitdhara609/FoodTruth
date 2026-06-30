export type BadgeTier = {
  id: string;
  name: string;
  requiredRecords: number;
  description: string;
};

export const badgeTiers: BadgeTier[] = [
  {
    id: "label-aware",
    name: "Label Aware",
    requiredRecords: 10,
    description: "Started building a conscious label-checking habit.",
  },
  {
    id: "ingredient-watcher",
    name: "Ingredient Watcher",
    requiredRecords: 25,
    description: "Regularly reviews ingredients before trusting the front label.",
  },
  {
    id: "conscious-consumer",
    name: "Conscious Consumer",
    requiredRecords: 50,
    description: "Maintains a growing archive of informed packaged-food choices.",
  },
  {
    id: "label-strategist",
    name: "Label Strategist",
    requiredRecords: 100,
    description: "Uses label intelligence as a consistent decision-making layer.",
  },
  {
    id: "foodtruth-archivist",
    name: "FoodTruth Archivist",
    requiredRecords: 250,
    description: "Has built a deep personal archive of label records.",
  },
];

export const getEarnedBadges = (savedReportCount: number) => {
  return badgeTiers.filter((badge) => savedReportCount >= badge.requiredRecords);
};

export const getNextBadge = (savedReportCount: number) => {
  return badgeTiers.find((badge) => savedReportCount < badge.requiredRecords);
};

export const getBadgeProgress = (savedReportCount: number) => {
  const nextBadge = getNextBadge(savedReportCount);

  if (!nextBadge) {
    return {
      nextBadge: null,
      remainingRecords: 0,
      progressPercentage: 100,
    };
  }

  const previousBadge = [...badgeTiers]
    .reverse()
    .find((badge) => savedReportCount >= badge.requiredRecords);

  const previousThreshold = previousBadge?.requiredRecords ?? 0;
  const range = nextBadge.requiredRecords - previousThreshold;
  const completedInRange = savedReportCount - previousThreshold;

  return {
    nextBadge,
    remainingRecords: nextBadge.requiredRecords - savedReportCount,
    progressPercentage: Math.round((completedInRange / range) * 100),
  };
};