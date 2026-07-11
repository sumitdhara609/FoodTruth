import { ensureOpenCV } from "./opencv";

export type PerspectiveResult = {
  image: ImageData;
  corrected: boolean;
};

export async function perspectiveCorrection(
  image: ImageData
): Promise<PerspectiveResult> {
  const cv = await ensureOpenCV();

  const src = cv.matFromImageData(image);

  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  const edges = new cv.Mat();
  cv.Canny(gray, edges, 75, 200);

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.findContours(
    edges,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );

  // Placeholder for future perspective transform

  const rgba = new cv.Mat();
  cv.cvtColor(gray, rgba, cv.COLOR_GRAY2RGBA);

  const output = new ImageData(
    new Uint8ClampedArray(rgba.data),
    rgba.cols,
    rgba.rows
  );

  src.delete();
  gray.delete();
  edges.delete();
  contours.delete();
  hierarchy.delete();
  rgba.delete();

  return {
    image: output,
    corrected: false,
  };
}