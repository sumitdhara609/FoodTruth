import { ensureOpenCV } from "./opencv";

import { analyzeBrightness } from "./analyzers/brightness";
import { analyzeContrast } from "./analyzers/contrast";
import { analyzeSharpness } from "./analyzers/sharpness";

import type { ImageAnalysis } from "./analyzers/types";

export async function analyzeVision(
  image: ImageData
): Promise<ImageAnalysis> {
  const cv = await ensureOpenCV();

  const src = cv.matFromImageData(image);

  const gray = new cv.Mat();

  cv.cvtColor(
    src,
    gray,
    cv.COLOR_RGBA2GRAY
  );

  const analysis: ImageAnalysis = {
    brightness: analyzeBrightness(
      cv,
      gray
    ),

    contrast: analyzeContrast(
      cv,
      gray
    ),

    sharpness: analyzeSharpness(
      cv,
      gray
    ),

    noise: 0,

    skewAngle: 0,

    perspectiveDistortion: 0,
  };

  gray.delete();
  src.delete();

  return analysis;
}