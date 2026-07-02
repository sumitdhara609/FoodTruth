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
  storesMimeTypeOnly: false,
  storesTemporaryObjectUrl: true,
  expiresOnBrowserClear: true,
} as const;

export type UploadSessionRecord = {
  input: UploadImageInput;
  objectUrl: string;
  temporaryOnly: true;
  fileNameStored: false;
  fileSizeStored: false;
  originalImageStored: false;
};

export type UploadSessionBridgeResult =
  | {
      success: true;
      input: UploadImageInput;
      objectUrl: string | null;
      record: UploadSessionRecord | null;
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
    objectUrl: null,
    record: null,
    message:
      "Temporary upload input prepared. Continue to review before generating a report.",
  };
};

export const createUploadSessionRecord = ({
  mimeType,
  objectUrl,
}: {
  mimeType: string;
  objectUrl: string;
}): UploadSessionBridgeResult => {
  if (!isAllowedUploadImageMimeType(mimeType)) {
    return {
      success: false,
      message: "Unsupported image type. Use JPG, PNG, or WEBP.",
    };
  }

  const input = createUploadImageInput(mimeType);

  return {
    success: true,
    input,
    objectUrl,
    record: {
      input,
      objectUrl,
      temporaryOnly: true,
      fileNameStored: false,
      fileSizeStored: false,
      originalImageStored: false,
    },
    message:
      "Temporary upload image reference prepared. Continue to review before generating a report.",
  };
};

export const serializeUploadSessionInput = (input: UploadImageInput) => {
  return JSON.stringify({
    input,
    objectUrl: null,
    temporaryOnly: true,
    fileNameStored: false,
    fileSizeStored: false,
    originalImageStored: false,
  });
};

export const serializeUploadSessionRecord = (record: UploadSessionRecord) => {
  return JSON.stringify({
    input: record.input,
    objectUrl: record.objectUrl,
    temporaryOnly: record.temporaryOnly,
    fileNameStored: record.fileNameStored,
    fileSizeStored: record.fileSizeStored,
    originalImageStored: record.originalImageStored,
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
    const parsed = JSON.parse(value) as {
      input?: Partial<UploadImageInput>;
      objectUrl?: unknown;
      temporaryOnly?: unknown;
      fileNameStored?: unknown;
      fileSizeStored?: unknown;
      originalImageStored?: unknown;
      mimeType?: unknown;
    };

    const mimeType = parsed.input?.mimeType ?? parsed.mimeType;

    if (typeof mimeType !== "string" || !isAllowedUploadImageMimeType(mimeType)) {
      return {
        success: false,
        message: "Temporary upload input is invalid. Upload the label again.",
      };
    }

    const input = createUploadImageInput(mimeType);
    const objectUrl =
      typeof parsed.objectUrl === "string" && parsed.objectUrl.length > 0
        ? parsed.objectUrl
        : null;

    const record: UploadSessionRecord | null = objectUrl
      ? {
          input,
          objectUrl,
          temporaryOnly: true,
          fileNameStored: false,
          fileSizeStored: false,
          originalImageStored: false,
        }
      : null;

    return {
      success: true,
      input,
      objectUrl,
      record,
      message: objectUrl
        ? "Temporary upload image reference found. You can run browser OCR extraction."
        : "Temporary upload input found. You can create an extraction draft.",
    };
  } catch {
    return {
      success: false,
      message: "Temporary upload input could not be read. Upload the label again.",
    };
  }
};