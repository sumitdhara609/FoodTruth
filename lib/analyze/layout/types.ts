export type LayoutSectionType =
  | "identity"
  | "ingredients"
  | "nutrition"
  | "serving"
  | "claims"
  | "manufacturer"
  | "storage"
  | "warning"
  | "footer"
  | "unknown";

export type LayoutLine = {
  text: string;
  lineNumber: number;
};

export type LayoutSection = {
  type: LayoutSectionType;
  confidence: number;
  lines: LayoutLine[];
};

export type LayoutDocument = {
  originalText: string;
  cleanedText: string;
  sections: LayoutSection[];
};