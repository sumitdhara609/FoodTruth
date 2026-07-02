export type UploadImageMimeType = "image/jpeg" | "image/png" | "image/webp";

export type UploadImageInput = {
  source: "upload";
  mimeType: UploadImageMimeType;
  temporaryOnly: true;
  fileNameStored: false;
  fileSizeStored: false;
  originalImageStored: false;
};

export const allowedUploadImageMimeTypes: UploadImageMimeType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const isAllowedUploadImageMimeType = (
  mimeType: string
): mimeType is UploadImageMimeType => {
  return allowedUploadImageMimeTypes.includes(mimeType as UploadImageMimeType);
};

export const createUploadImageInput = (
  mimeType: UploadImageMimeType
): UploadImageInput => {
  return {
    source: "upload",
    mimeType,
    temporaryOnly: true,
    fileNameStored: false,
    fileSizeStored: false,
    originalImageStored: false,
  };
};