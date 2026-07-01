export type ReviewSource = "manual" | "upload" | "scan";

export type ReviewRouteDefinition = {
  source: ReviewSource;
  label: string;
  href: string;
  description: string;
  requiresExtractionDraft: boolean;
  requiresUserReview: true;
};

export const reviewRoutes: Record<ReviewSource, ReviewRouteDefinition> = {
  manual: {
    source: "manual",
    label: "Manual review",
    href: "/analyze/manual",
    description:
      "Enter reviewed label values directly and generate a FoodTruth report.",
    requiresExtractionDraft: false,
    requiresUserReview: true,
  },
  upload: {
    source: "upload",
    label: "Upload review",
    href: "/analyze/upload/review",
    description:
      "Review values prepared from an uploaded label before generating a report.",
    requiresExtractionDraft: true,
    requiresUserReview: true,
  },
  scan: {
    source: "scan",
    label: "Scan review",
    href: "/analyze/scan/review",
    description:
      "Review values prepared from a camera scan before generating a report.",
    requiresExtractionDraft: true,
    requiresUserReview: true,
  },
};

export const getReviewRoute = (source: ReviewSource) => {
  return reviewRoutes[source];
};

export const getExtractionReviewRoutes = () => {
  return Object.values(reviewRoutes).filter(
    (route) => route.requiresExtractionDraft
  );
};