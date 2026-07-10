import { ensureOpenCV } from "./opencv";
import type { ImagePreprocessResult } from "./types";

export async function preprocessImage(
  image: ImageData
): Promise<ImagePreprocessResult> {
  await ensureOpenCV();

  return {
    original: image,
    processed: image,

    width: image.width,
    height: image.height,

    rotated: false,
    deskewed: false,
    perspectiveCorrected: false,

    brightnessScore: 0,
    contrastScore: 0,
    sharpnessScore: 0,
  };
}