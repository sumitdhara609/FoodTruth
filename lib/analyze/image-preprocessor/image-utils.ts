const MAX_SIDE = 1600;

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

  let width = image.width;
  let height = image.height;

  const longestSide = Math.max(width, height);

  if (longestSide > MAX_SIDE) {
    const scale = MAX_SIDE / longestSide;

    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Unable to create canvas context.");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    0,
    0,
    width,
    height
  );

  const imageData = ctx.getImageData(
    0,
    0,
    width,
    height
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

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create image blob."));
          return;
        }

        resolve(blob);
      },
      "image/png",
      1
    );
  });
}