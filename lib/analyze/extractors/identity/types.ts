import type {
  ExtractedField,
  ExtractorResult,
} from "../shared";

export type IdentityData = {
  brand: ExtractedField<string>;
  productName: ExtractedField<string>;
  category: ExtractedField<string>;
};

export type IdentityExtractorResult =
  ExtractorResult<IdentityData>;