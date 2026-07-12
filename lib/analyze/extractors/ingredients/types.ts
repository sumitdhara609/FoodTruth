import type {
  ExtractedField,
  ExtractorResult,
} from "../shared";

export type IngredientsData = {
  ingredients: ExtractedField<string>;
};

export type IngredientsExtractorResult =
  ExtractorResult<IngredientsData>;