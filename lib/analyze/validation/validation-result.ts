import type { ValidationSeverity } from "./severity";

export type ValidationIssue = {
  field: string;

  severity: ValidationSeverity;

  message: string;
};

export type ValidationResult = {
  passed: boolean;

  score: number;

  issues: ValidationIssue[];
};