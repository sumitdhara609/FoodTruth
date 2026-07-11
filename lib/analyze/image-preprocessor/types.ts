export type ImageQualityMetrics = {
  brightness: number;
  contrast: number;
  sharpness: number;
};

export type ImagePreprocessResult = {
  // Original uploaded image
  original: ImageData;

  // Image after browser preprocessing
  processed: ImageData;

  width: number;
  height: number;

  // Processing information
  rotated: boolean;
  rotationAngle: number;

  deskewed: boolean;
  perspectiveCorrected: boolean;

  // Image quality scores
  brightnessScore: number;
  contrastScore: number;
  sharpnessScore: number;
};