export type ImagePreprocessResult = {
  original: ImageData;
  processed: ImageData;

  width: number;
  height: number;

  rotated: boolean;
  rotationAngle: number;

  deskewed: boolean;
  perspectiveCorrected: boolean;

  brightnessScore: number;
  contrastScore: number;
  sharpnessScore: number;
};