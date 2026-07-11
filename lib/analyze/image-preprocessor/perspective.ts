export type PerspectiveResult = {
  image: ImageData;
  corrected: boolean;
};

export async function perspectiveCorrection(
  image: ImageData
): Promise<PerspectiveResult> {
  return {
    image,
    corrected: false,
  };
}