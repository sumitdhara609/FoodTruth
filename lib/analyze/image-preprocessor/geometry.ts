export type Point = {
  x: number;
  y: number;
};

export type Quad = [
  Point,
  Point,
  Point,
  Point
];

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function polygonArea(points: Point[]): number {
  let area = 0;

  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;

    area +=
      points[i].x * points[j].y -
      points[j].x * points[i].y;
  }

  return Math.abs(area / 2);
}

export function orderQuad(points: Point[]): Quad {
  if (points.length !== 4) {
    throw new Error("Quad must contain exactly 4 points.");
  }

  const sorted = [...points];

  const sums = sorted.map((p) => p.x + p.y);
  const diffs = sorted.map((p) => p.x - p.y);

  const topLeft =
    sorted[sums.indexOf(Math.min(...sums))];

  const bottomRight =
    sorted[sums.indexOf(Math.max(...sums))];

  const topRight =
    sorted[diffs.indexOf(Math.max(...diffs))];

  const bottomLeft =
    sorted[diffs.indexOf(Math.min(...diffs))];

  return [
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
  ];
}

export function quadWidth(quad: Quad): number {
  return Math.max(
    distance(quad[0], quad[1]),
    distance(quad[2], quad[3])
  );
}

export function quadHeight(quad: Quad): number {
  return Math.max(
    distance(quad[0], quad[3]),
    distance(quad[1], quad[2])
  );
}

export function aspectRatio(quad: Quad): number {
  return quadWidth(quad) / quadHeight(quad);
}

export function isReasonableLabelShape(
  quad: Quad
): boolean {
  const width = quadWidth(quad);
  const height = quadHeight(quad);

  if (width < 150) return false;

  if (height < 150) return false;

  const ratio = width / height;

  return ratio > 0.4 && ratio < 3.5;
}