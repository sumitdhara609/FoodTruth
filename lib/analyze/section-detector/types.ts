export type OcrSectionType =
  | "identity"
  | "ingredients"
  | "nutrition"
  | "claims"
  | "warnings"
  | "storage"
  | "manufacturer"
  | "other";

export type OcrSection = {
  type: OcrSectionType;
  title: string;
  lines: string[];
};

export type OcrSections = {
  identity: string[];
  ingredients: string[];
  nutrition: string[];
  claims: string[];
  warnings: string[];
  storage: string[];
  manufacturer: string[];
  other: string[];
};