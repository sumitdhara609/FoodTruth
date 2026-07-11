export function analyzeSharpness(
  cv: any,
  gray: any
): number {
  const laplacian = new cv.Mat();

  cv.Laplacian(
    gray,
    laplacian,
    cv.CV_64F
  );

  const mean = new cv.Mat();
  const std = new cv.Mat();

  cv.meanStdDev(
    laplacian,
    mean,
    std
  );

  const variance =
    Math.pow(std.doubleAt(0, 0), 2);

  laplacian.delete();
  mean.delete();
  std.delete();

  return variance;
}