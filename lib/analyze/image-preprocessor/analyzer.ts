import { ensureOpenCV } from "./opencv";

export type ImageAnalysis = {
  brightness: number;
  contrast: number;
  sharpness: number;
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

  // Laplacian variance = sharpness
  const laplacian = new cv.Mat();
  cv.Laplacian(gray, laplacian, cv.CV_64F);

  const lapMean = new cv.Mat();
  const lapStd = new cv.Mat();

  cv.meanStdDev(laplacian, lapMean, lapStd);

  const sharpness = Math.pow(lapStd.doubleAt(0, 0), 2);

  src.delete();
  gray.delete();
  mean.delete();
  stddev.delete();
  laplacian.delete();
  lapMean.delete();
  lapStd.delete();

  return {
    brightness,
    contrast,
    sharpness,
  };
}