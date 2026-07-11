export function analyzeBrightness(
  cv: any,
  gray: any
): number {
  const mean = new cv.Mat();
  const std = new cv.Mat();

  cv.meanStdDev(gray, mean, std);

  const brightness = mean.doubleAt(0, 0);

  mean.delete();
  std.delete();

  return brightness;
}