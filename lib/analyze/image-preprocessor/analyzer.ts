import { ensureOpenCV } from "./opencv";

export type ImageAnalysis = {
  brightness: number;
  contrast: number;
};

export async function analyzeImage(
  image: ImageData
): Promise<ImageAnalysis> {
  const cv = await ensureOpenCV();

  const src = cv.matFromImageData(image);

  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  const mean = new cv.Mat();
  const stddev = new cv.Mat();

  cv.meanStdDev(gray, mean, stddev);

  const brightness = mean.doubleAt(0, 0);
  const contrast = stddev.doubleAt(0, 0);

  src.delete();
  gray.delete();
  mean.delete();
  stddev.delete();

  return {
    brightness,
    contrast,
  };
}