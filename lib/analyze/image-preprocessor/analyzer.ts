export type ImageAnalysis = {
  brightness: number;
  contrast: number;
  sharpness: number;
};

export async function analyzeImage(
  image: ImageData
): Promise<ImageAnalysis> {
  const data = image.data;

  let sum = 0;
  let min = 255;
  let max = 0;

  for (let i = 0; i < data.length; i += 4) {
    const gray =
      0.299 * data[i] +
      0.587 * data[i + 1] +
      0.114 * data[i + 2];

    sum += gray;

    if (gray < min) min = gray;
    if (gray > max) max = gray;
  }

  const pixels = data.length / 4;

  return {
    brightness: sum / pixels,
    contrast: max - min,
    sharpness: 100,
  };
}