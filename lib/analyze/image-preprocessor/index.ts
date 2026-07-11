import { ensureOpenCV } from "./opencv";
import { analyzeImage } from "./analyzer";
import { normalizeImage } from "./normalize";
import { adaptiveThreshold } from "./threshold";
import { deskewImage } from "./deskew";
import { perspectiveCorrection } from "./perspective";
import type { ImagePreprocessResult } from "./types";

export async function preprocessImage(
  image: ImageData
): Promise<ImagePreprocessResult> {
  await ensureOpenCV();

  // Analyze original image quality
  const analysis = await analyzeImage(image);

  // Normalize brightness & contrast
  const normalized = await normalizeImage(image);

  // Improve OCR readability
  const thresholded = await adaptiveThreshold(normalized);

  // Correct rotation
  const deskew = await deskewImage(thresholded);

  // Correct perspective
  const perspective = await perspectiveCorrection(deskew.image);

  const processed = perspective.image;

  return {
    original: image,
    processed,

    width: processed.width,
    height: processed.height,

    rotated: deskew.corrected,
    rotationAngle: deskew.angle,
    deskewed: deskew.corrected,
    perspectiveCorrected: perspective.corrected,

    brightnessScore: analysis.brightness,
    contrastScore: analysis.contrast,
    sharpnessScore: analysis.sharpness,
  };
}