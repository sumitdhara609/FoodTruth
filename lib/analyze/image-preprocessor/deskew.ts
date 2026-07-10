import { ensureOpenCV } from "./opencv";

export type DeskewResult = {
  image: ImageData;
  angle: number;
  corrected: boolean;
};

export async function deskewImage(
  image: ImageData
): Promise<DeskewResult> {
  await ensureOpenCV();

  // Placeholder implementation.
  // The full Hough-transform based rotation detection
  // will replace this in the next step.

  return {
    image,
    angle: 0,
    corrected: false,
  };
}