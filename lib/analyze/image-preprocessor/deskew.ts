import { ensureOpenCV } from "./opencv";

export type DeskewResult = {
  image: ImageData;
  angle: number;
  corrected: boolean;
};

export async function deskewImage(
  image: ImageData
): Promise<DeskewResult> {
  const cv = await ensureOpenCV();

  const src = cv.matFromImageData(image);

  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  const edges = new cv.Mat();

  cv.Canny(
    gray,
    edges,
    50,
    150
  );

  const lines = new cv.Mat();

  cv.HoughLines(
    edges,
    lines,
    1,
    Math.PI / 180,
    150
  );

  let angle = 0;

  if (lines.rows > 0) {
    let total = 0;

    for (let i = 0; i < lines.rows; i++) {
      const theta = lines.data32F[i * 2 + 1];

      total += theta;
    }

    angle =
      (total / lines.rows) *
        (180 / Math.PI) -
      90;
  }

  const center = new cv.Point(
    src.cols / 2,
    src.rows / 2
  );

  const rotation = cv.getRotationMatrix2D(
    center,
    angle,
    1
  );

  const rotated = new cv.Mat();

  cv.warpAffine(
    src,
    rotated,
    rotation,
    new cv.Size(src.cols, src.rows),
    cv.INTER_LINEAR,
    cv.BORDER_CONSTANT,
    new cv.Scalar(255, 255, 255, 255)
  );

  const output = new ImageData(
    new Uint8ClampedArray(rotated.data),
    rotated.cols,
    rotated.rows
  );

  src.delete();
  gray.delete();
  edges.delete();
  lines.delete();
  rotation.delete();
  rotated.delete();

  return {
    image: output,
    angle,
    corrected: Math.abs(angle) > 1,
  };
}