import { ensureOpenCV } from "./opencv";

export async function normalizeImage(
  image: ImageData
): Promise<ImageData> {
  const cv = await ensureOpenCV();

  const src = cv.matFromImageData(image);

  // Convert to grayscale
  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  // Histogram Equalization
  const equalized = new cv.Mat();
  cv.equalizeHist(gray, equalized);

  // Convert back to RGBA
  const rgba = new cv.Mat();
  cv.cvtColor(equalized, rgba, cv.COLOR_GRAY2RGBA);

  const output = new ImageData(
    new Uint8ClampedArray(rgba.data),
    rgba.cols,
    rgba.rows
  );

  src.delete();
  gray.delete();
  equalized.delete();
  rgba.delete();

  return output;
}