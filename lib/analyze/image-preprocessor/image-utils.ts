export async function imageToImageData(
  source: File | Blob | string
): Promise<ImageData> {
  const image = new Image();

  image.crossOrigin = "anonymous";

  const url =
    typeof source === "string"
      ? source
      : URL.createObjectURL(source);

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
    image.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context.");
  }

  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  if (typeof source !== "string") {
    URL.revokeObjectURL(url);
  }

  return imageData;
}

export async function imageDataToBlob(
  image: ImageData
): Promise<Blob> {
  const canvas = document.createElement("canvas");

  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context.");
  }

  ctx.putImageData(image, 0, 0);

  return await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, "image/png");
  });
}