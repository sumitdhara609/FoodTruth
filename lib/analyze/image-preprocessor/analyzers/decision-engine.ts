import type { ImageAnalysis } from "./types";

export type ProcessingPlan = {
  normalize: boolean;
  threshold: boolean;
  sharpen: boolean;
  denoise: boolean;
  deskew: boolean;
  perspectiveCorrection: boolean;
};

export function createProcessingPlan(
  analysis: Omit<ImageAnalysis, "recommendations">
): ProcessingPlan {

  return {

    normalize:
      analysis.brightness < 90 ||
      analysis.brightness > 180,

    threshold:
      analysis.contrast < 40,

    sharpen:
      analysis.sharpness < 120,

    denoise:
      analysis.noise > 25,

    deskew:
      Math.abs(analysis.skewAngle) > 2,

    perspectiveCorrection:
      analysis.perspectiveDistortion > 15,
  };
}