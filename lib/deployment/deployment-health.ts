import { requiredDeploymentEnvVars } from "@/lib/deployment/deployment-readiness";

export type DeploymentHealthItem = {
  key: string;
  configured: boolean;
};

export type DeploymentHealthSnapshot = {
  ready: boolean;
  configuredCount: number;
  totalCount: number;
  items: DeploymentHealthItem[];
};

export const getDeploymentHealthSnapshot = (
  env: Record<string, string | undefined> = process.env
): DeploymentHealthSnapshot => {
  const items = requiredDeploymentEnvVars.map((key) => ({
    key,
    configured: Boolean(env[key]?.trim()),
  }));

  const configuredCount = items.filter((item) => item.configured).length;

  return {
    ready: configuredCount === items.length,
    configuredCount,
    totalCount: items.length,
    items,
  };
};