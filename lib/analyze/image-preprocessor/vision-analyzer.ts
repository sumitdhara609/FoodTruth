import cv from "@techstark/opencv-js";

import { ensureOpenCV } from "./opencv";

import { analyzeBrightness } from "./analyzers/brightness";
import { analyzeContrast } from "./analyzers/contrast";
import { analyzeSharpness } from "./analyzers/sharpness";

import type { ImageAnalysis } from "./analyzers/types";

export async function analyzeVision(
  image: ImageData
): Promise<ImageAnalysis> {

  await ensureOpenCV();

  const src = cv.matFromImageData(image);

  const gray = new cv.Mat();

  cv.cvtColor(
    src,
    gray,
    cv.COLOR_RGBA2GRAY
  );

  const analysis: ImageAnalysis = {

    brightness:
      analyzeBrightness(gray),

    contrast:
      analyzeContrast(gray),

    sharpness:
      analyzeSharpness(gray),

    noise: 0,

    skewAngle: 0,

    perspectiveDistortion: 0,
  };

  gray.delete();
  src.delete();

  return analysis;
}