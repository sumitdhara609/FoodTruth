import { ensureOpenCV } from "./opencv";
import { findLargestLabelContour } from "./contours";
import { quadHeight, quadWidth } from "./geometry";

export type LabelDetectionResult = {
  image: ImageData;
  detected: boolean;
};

export async function detectFoodLabel(
  image: ImageData
): Promise<LabelDetectionResult> {
  const cv = await ensureOpenCV();

  const detection = await findLargestLabelContour(image);

  if (!detection) {
    return {
      image,
      detected: false,
    };
  }

  const src = cv.matFromImageData(image);

  const quad = detection.quad;

  const width = Math.round(quadWidth(quad));
  const height = Math.round(quadHeight(quad));

  const srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
    quad[0].x,
    quad[0].y,

    quad[1].x,
    quad[1].y,

    quad[2].x,
    quad[2].y,

    quad[3].x,
    quad[3].y,
  ]);

  const dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [
    0,
    0,

    width,
    0,

    width,
    height,

    0,
    height,
  ]);

  const transform = cv.getPerspectiveTransform(
    srcTri,
    dstTri
  );

  const dst = new cv.Mat();

  cv.warpPerspective(
    src,
    dst,
    transform,
    new cv.Size(width, height),
    cv.INTER_LINEAR,
    cv.BORDER_CONSTANT,
    new cv.Scalar()
  );

  const output = new ImageData(
    new Uint8ClampedArray(dst.data),
    dst.cols,
    dst.rows
  );

  src.delete();
  srcTri.delete();
  dstTri.delete();
  transform.delete();
  dst.delete();

  return {
    image: output,
    detected: true,
  };
}