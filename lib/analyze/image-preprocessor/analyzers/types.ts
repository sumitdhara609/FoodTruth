export type ImageAnalysis = {

  brightness: number;

  contrast: number;

  sharpness: number;

  noise: number;

  skewAngle: number;

  perspectiveDistortion: number;

};

export type ProcessingPlan = {

  normalize: boolean;

  threshold: boolean;

  sharpen: boolean;

  denoise: boolean;

  deskew: boolean;

  perspectiveCorrection: boolean;
};