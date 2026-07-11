import { ensureOpenCV } from "./opencv";
import {
  Point,
  Quad,
  polygonArea,
  orderQuad,
  isReasonableLabelShape,
} from "./geometry";

export type DetectedLabel = {
  quad: Quad;
  area: number;
};

export async function findLargestLabelContour(
  image: ImageData
): Promise<DetectedLabel | null> {
  const cv = await ensureOpenCV();

  const src = cv.matFromImageData(image);

  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  const blurred = new cv.Mat();
  cv.GaussianBlur(
    gray,
    blurred,
    new cv.Size(5, 5),
    0
  );

  const edges = new cv.Mat();

  cv.Canny(
    blurred,
    edges,
    75,
    200
  );

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.findContours(
    edges,
    contours,
    hierarchy,
    cv.RETR_LIST,
    cv.CHAIN_APPROX_SIMPLE
  );

  let best: DetectedLabel | null = null;

  for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);

    const perimeter = cv.arcLength(
      contour,
      true
    );

    const approx = new cv.Mat();

    cv.approxPolyDP(
      contour,
      approx,
      perimeter * 0.02,
      true
    );

    if (approx.rows === 4) {
      const points: Point[] = [];

      for (let j = 0; j < 4; j++) {
        points.push({
          x: approx.intPtr(j, 0)[0],
          y: approx.intPtr(j, 0)[1],
        });
      }

      const quad = orderQuad(points);

      if (!isReasonableLabelShape(quad)) {
        approx.delete();
        contour.delete();
        continue;
      }

      const area = polygonArea(points);

      if (
        !best ||
        area > best.area
      ) {
        best = {
          quad,
          area,
        };
      }
    }

    approx.delete();
    contour.delete();
  }

  src.delete();
  gray.delete();
  blurred.delete();
  edges.delete();
  contours.delete();
  hierarchy.delete();

  return best;
}