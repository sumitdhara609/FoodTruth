export type ImagePreprocessResult = {
  original: ImageData;
  processed: ImageData;

  width: number;
  height: number;

  rotated: boolean;
  deskewed: boolean;
  perspectiveCorrected: boolean;

  brightnessScore: number;
  contrastScore: number;
  sharpnessScore: number;
};