import cv from "@techstark/opencv-js";

export function analyzeContrast(
  gray: cv.Mat
): number {

  const mean = new cv.Mat();
  const std = new cv.Mat();

  cv.meanStdDev(gray, mean, std);

  const contrast = std.doubleAt(0, 0);

  mean.delete();
  std.delete();

  return contrast;
}