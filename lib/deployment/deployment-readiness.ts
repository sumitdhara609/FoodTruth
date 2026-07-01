export const requiredDeploymentEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SITE_URL",
] as const;

export const deploymentReadinessChecklist = [
  {
    title: "Environment variables",
    items: [
      "NEXT_PUBLIC_SUPABASE_URL is configured.",
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is configured.",
      "NEXT_PUBLIC_SITE_URL points to the deployed domain.",
    ],
  },
  {
    title: "Supabase Auth",
    items: [
      "Confirm Email is enabled.",
      "Anonymous sign-ins are disabled.",
      "Auth callback URL is added in Supabase redirect URLs.",
    ],
  },
  {
    title: "Database",
    items: [
      "Profiles table migration is applied.",
      "Saved label reports table migration is applied.",
      "Row Level Security is enabled.",
      "User-owned report policies are active.",
    ],
  },
  {
    title: "FoodTruth storage policy",
    items: [
      "Original label images are not stored.",
      "Uploaded file names are not stored.",
      "Uploaded file sizes are not stored.",
      "Only reviewed label data and report signals are saved.",
    ],
  },
] as const;

export const getDeploymentReadinessItemCount = () => {
  return deploymentReadinessChecklist.reduce(
    (total, section) => total + section.items.length,
    0
  );
};