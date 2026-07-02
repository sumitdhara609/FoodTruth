import {
  createUploadImageInput,
  isAllowedUploadImageMimeType,
  type UploadImageInput,
} from "@/lib/analyze/upload-image-input";

export const uploadSessionBridgeConfig = {
  storageKey: "foodtruth.temporaryUploadInput",
  storesOriginalImage: false,
  storesFileName: false,
  storesFileSize: false,
  storesMimeTypeOnly: true,
  expiresOnBrowserClear: true,
} as const;

export type UploadSessionBridgeResult =
  | {
      success: true;
      input: UploadImageInput;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export const createUploadSessionInputFromMimeType = (
  mimeType: string
): UploadSessionBridgeResult => {
  if (!isAllowedUploadImageMimeType(mimeType)) {
    return {
      success: false,
      message: "Unsupported image type. Use JPG, PNG, or WEBP.",
    };
  }

  return {
    success: true,
    input: createUploadImageInput(mimeType),
    message:
      "Temporary upload input prepared. Continue to review before generating a report.",
  };
};

export const serializeUploadSessionInput = (input: UploadImageInput) => {
  return JSON.stringify({
    source: input.source,
    mimeType: input.mimeType,
    temporaryOnly: input.temporaryOnly,
    fileNameStored: input.fileNameStored,
    fileSizeStored: input.fileSizeStored,
    originalImageStored: input.originalImageStored,
  });
};

export const parseUploadSessionInput = (
  value: string | null
): UploadSessionBridgeResult => {
  if (!value) {
    return {
      success: false,
      message:
        "No temporary upload input found. Upload a label image before running extraction.",
    };
  }

  try {
    const parsed = JSON.parse(value) as Partial<UploadImageInput>;

    if (!parsed.mimeType || !isAllowedUploadImageMimeType(parsed.mimeType)) {
      return {
        success: false,
        message: "Temporary upload input is invalid. Upload the label again.",
      };
    }

    return {
      success: true,
      input: createUploadImageInput(parsed.mimeType),
      message:
        "Temporary upload input found. You can create an extraction draft.",
    };
  } catch {
    return {
      success: false,
      message: "Temporary upload input could not be read. Upload the label again.",
    };
  }
};