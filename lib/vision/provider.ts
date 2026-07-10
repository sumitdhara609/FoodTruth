import type { VisionExtraction } from "./schema";

export type VisionProviderInput = {
  image: Blob | File | string;
};

export type VisionProviderResult =
  | {
      success: true;
      extraction: VisionExtraction;
    }
  | {
      success: false;
      message: string;
    };

export interface VisionProvider {
  readonly id: string;

  readonly name: string;

  extract(
    input: VisionProviderInput
  ): Promise<VisionProviderResult>;
}