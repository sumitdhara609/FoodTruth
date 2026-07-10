import { ensureOpenCV } from "./opencv";
import { analyzeImage } from "./analyzer";
import { normalizeImage } from "./normalize";
import { adaptiveThreshold } from "./threshold";
import type { ImagePreprocessResult } from "./types";
import { deskewImage } from "./deskew";

export async function preprocessImage(
  image: ImageData
): Promise<ImagePreprocessResult> {
  await ensureOpenCV();

  const analysis = await analyzeImage(image);

  const normalized = await normalizeImage(image);

  const thresholded = await adaptiveThreshold(normalized);

const deskew = await deskewImage(thresholded);

const processed = deskew.image;

  return {
    original: image,
    processed,

    width: processed.width,
    height: processed.height,

    rotated: deskew.corrected,
    rotationAngle: deskew.angle,
    deskewed: deskew.corrected,
    perspectiveCorrected: false,

    brightnessScore: analysis.brightness,
    contrastScore: analysis.contrast,
    sharpnessScore: 0,
  };
}