export const MAX_LABEL_UPLOAD_SIZE_MB = 4;

export const MAX_LABEL_UPLOAD_SIZE_BYTES =
  MAX_LABEL_UPLOAD_SIZE_MB * 1024 * 1024;

export const acceptedLabelImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AcceptedLabelImageType = (typeof acceptedLabelImageTypes)[number];

export const savedReportStoragePolicy = {
  storesOriginalImage: false,
  storesFileName: false,
  storesFileSize: false,
  storesExtractedLabelData: true,
  maxUploadSizeMb: MAX_LABEL_UPLOAD_SIZE_MB,
};

export const isAcceptedLabelImageType = (fileType: string) => {
  return acceptedLabelImageTypes.includes(fileType as AcceptedLabelImageType);
};

export const isWithinLabelUploadSizeLimit = (sizeBytes: number) => {
  return sizeBytes <= MAX_LABEL_UPLOAD_SIZE_BYTES;
};