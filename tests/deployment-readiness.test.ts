import { describe, expect, it } from "vitest";
import {
  deploymentReadinessChecklist,
  getDeploymentReadinessItemCount,
  requiredDeploymentEnvVars,
} from "@/lib/deployment/deployment-readiness";

describe("deployment readiness", () => {
  it("keeps required deployment environment variables explicit", () => {
    expect(requiredDeploymentEnvVars).toEqual([
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      "NEXT_PUBLIC_SITE_URL",
    ]);
  });

  it("keeps deployment checklist grouped by production concerns", () => {
    expect(deploymentReadinessChecklist.map((section) => section.title)).toEqual([
      "Environment variables",
      "Supabase Auth",
      "Database",
      "FoodTruth storage policy",
    ]);
  });

  it("tracks all deployment readiness items", () => {
    expect(getDeploymentReadinessItemCount()).toBeGreaterThanOrEqual(10);
  });

  it("keeps privacy storage rules visible before deployment", () => {
    const storageSection = deploymentReadinessChecklist.find(
      (section) => section.title === "FoodTruth storage policy"
    );

    expect(storageSection?.items.join(" ")).toContain(
      "Original label images are not stored."
    );
    expect(storageSection?.items.join(" ")).toContain(
      "Only reviewed label data and report signals are saved."
    );
  });
});