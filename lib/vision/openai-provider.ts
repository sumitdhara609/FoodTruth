import type {
  VisionProvider,
  VisionProviderInput,
  VisionProviderResult,
} from "./provider";

export class OpenAIVisionProvider implements VisionProvider {
  readonly id = "openai";

  readonly name = "OpenAI Vision";

  async extract(
    input: VisionProviderInput
  ): Promise<VisionProviderResult> {
    void input;

    return {
      success: false,
      message:
        "OpenAI Vision provider has not been configured yet.",
    };
  }
}