export type SystemStatus = "Ready" | "In Progress" | "Planned";

export type SystemStatusItem = {
  title: string;
  description: string;
  status: SystemStatus;
};

export const systemStatusItems: SystemStatusItem[] = [
  {
    title: "Manual analyzer",
    description:
      "Manual label entry can generate structured FoodTruth reports.",
    status: "Ready",
  },
  {
    title: "Account authentication",
    description:
      "Sign up, sign in, sign out, protected account access, and auth callback handling are prepared.",
    status: "Ready",
  },
  {
    title: "Saved reports",
    description:
      "Manual reports can be mapped, saved, queried, and displayed in the account archive.",
    status: "Ready",
  },
  {
    title: "Database policy",
    description:
      "Saved reports follow user ownership, row-level security, and privacy-respecting storage rules.",
    status: "Ready",
  },
  {
    title: "Deployment readiness",
    description:
      "Environment, Supabase, database, and storage-policy checklists are documented.",
    status: "In Progress",
  },
  {
    title: "Upload analysis",
    description:
      "Upload workflow is architecturally prepared but image extraction is not active yet.",
    status: "Planned",
  },
  {
    title: "Scan analysis",
    description:
      "Camera-led scan workflow is architecturally prepared but not active yet.",
    status: "Planned",
  },
];

export const getSystemStatusCounts = () => {
  return systemStatusItems.reduce(
    (counts, item) => {
      counts[item.status] += 1;
      return counts;
    },
    {
      Ready: 0,
      "In Progress": 0,
      Planned: 0,
    } satisfies Record<SystemStatus, number>
  );
};