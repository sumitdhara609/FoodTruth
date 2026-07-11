import { analyzeImage } from "./analyzer";
import { normalizeImage } from "./normalize";
import { adaptiveThreshold } from "./threshold";
import { deskewImage } from "./deskew";
import { perspectiveCorrection } from "./perspective";

import type { ImagePreprocessResult } from "./types";

export async function preprocessImage(
  image: ImageData
): Promise<ImagePreprocessResult> {
  const analysis = await analyzeImage(image);

  const normalized = await normalizeImage(image);

  const thresholded = await adaptiveThreshold(normalized);

  const deskew = await deskewImage(thresholded);

  const perspective = await perspectiveCorrection(
    deskew.image
  );

  return {
    original: image,
    processed: perspective.image,

    width: perspective.image.width,
    height: perspective.image.height,

    rotated: deskew.corrected,
    rotationAngle: deskew.angle,

    deskewed: deskew.corrected,
    perspectiveCorrected: perspective.corrected,

    brightnessScore: analysis.brightness,
    contrastScore: analysis.contrast,
    sharpnessScore: analysis.sharpness,
  };
}