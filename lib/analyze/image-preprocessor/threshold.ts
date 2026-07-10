import { ensureOpenCV } from "./opencv";

export async function adaptiveThreshold(
  image: ImageData
): Promise<ImageData> {
  const cv = await ensureOpenCV();

  const src = cv.matFromImageData(image);

  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  const thresholded = new cv.Mat();

  cv.adaptiveThreshold(
    gray,
    thresholded,
    255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY,
    31,
    15
  );

  const rgba = new cv.Mat();
  cv.cvtColor(thresholded, rgba, cv.COLOR_GRAY2RGBA);

  const output = new ImageData(
    new Uint8ClampedArray(rgba.data),
    rgba.cols,
    rgba.rows
  );

  src.delete();
  gray.delete();
  thresholded.delete();
  rgba.delete();

  return output;
}