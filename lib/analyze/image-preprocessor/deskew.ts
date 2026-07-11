export type DeskewResult = {
  image: ImageData;
  corrected: boolean;
  angle: number;
};

export async function deskewImage(
  image: ImageData
): Promise<DeskewResult> {
  return {
    image,
    corrected: false,
    angle: 0,
  };
}