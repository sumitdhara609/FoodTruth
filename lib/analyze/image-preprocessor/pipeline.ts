import { ensureOpenCV } from "./opencv";
import { analyzeImage } from "./analyzer";
import { normalizeImage } from "./normalize";
import type { ImagePreprocessResult } from "./types";

export async function preprocessImage(
  image: ImageData
): Promise<ImagePreprocessResult> {
  await ensureOpenCV();

  const analysis = await analyzeImage(image);

  const processed = await normalizeImage(image);

  return {
    original: image,
    processed,

    width: processed.width,
    height: processed.height,

    rotated: false,
    deskewed: false,
    perspectiveCorrected: false,

    brightnessScore: analysis.brightness,
    contrastScore: analysis.contrast,
    sharpnessScore: 0,
  };
}