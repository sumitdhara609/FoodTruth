export const productionBuildChecks = [
  {
    title: "TypeScript build",
    description:
      "Next.js production build should complete without type or route errors.",
    command: "npm run build",
  },
  {
    title: "Test suite",
    description:
      "Vitest should pass across engine, auth, database, account, analyzer, and deployment foundations.",
    command: "npm run test:run",
  },
  {
    title: "Lint check",
    description:
      "ESLint should pass before deployment to avoid unsafe code patterns.",
    command: "npm run lint",
  },
] as const;

export const requiredPreDeploymentCommands = productionBuildChecks.map(
  (check) => check.command
);