export type PerspectiveResult = {
  image: ImageData;
  corrected: boolean;
};

export async function correctPerspective(
  image: ImageData
): Promise<PerspectiveResult> {
  return {
    image,
    corrected: false,
  };
}